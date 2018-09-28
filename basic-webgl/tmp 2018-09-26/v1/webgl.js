
const VERTEX_SHADER = `
    attribute vec2 a_position;
    attribute vec2 a_texcoord;

    uniform mat3 u_matrix;
    uniform mat3 u_textureMatrix;

    varying vec2 v_texcoord;

    void main() {
        gl_Position = vec4((u_matrix * vec3(a_position, 1)).xy, 0, 1);
        v_texcoord = (u_textureMatrix * vec3(a_texcoord, 1)).xy;
    }`;


const FRAGMENT_SHADER = `
    precision mediump float;

    uniform sampler2D u_texture;

    varying vec2 v_texcoord;    

    void main() {
        gl_FragColor = texture2D(u_texture, v_texcoord);
    }`;

class WebglRenderer {
    constructor(canvas) {
        // Get a Webgl context
        this.glCanvas = canvas;
        this.gl = this.getContext(this.glCanvas);

        // Setup shaders and buffers
        this.init();

        // textures
        this.textures = {};
        this.currentTexture = null;
    }

    init() {
        // Setup GLSL program
        this.program = this.gl.createProgram();
        this.gl.attachShader(this.program, this.compileShader(VERTEX_SHADER, this.gl.VERTEX_SHADER));
        this.gl.attachShader(this.program, this.compileShader(FRAGMENT_SHADER, this.gl.FRAGMENT_SHADER));
        this.gl.linkProgram(this.program);

        // Look up where the vertex data needs to go
        this.positionLocation = this.gl.getAttribLocation(this.program, 'a_position');
        this.texcoordLocation = this.gl.getAttribLocation(this.program, 'a_texcoord');
  
        // Create buffer to put three 2d clip space points in
        this.positionBuffer = this.gl.createBuffer();
        this.texcoordBuffer = this.gl.createBuffer();

        // create positions and texture matrix
        this.matrixLocation = this.gl.getUniformLocation(this.program, 'u_matrix');
        this.textureMatrixLocation = this.gl.getUniformLocation(this.program, 'u_textureMatrix');

        var unitQuad = [
            0, 0,
            0, 1,
            1, 0,
            1, 0,
            0, 1,
            1, 1,
        ]

        // Put a unit quad in the buffer
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.positionBuffer);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(unitQuad), this.gl.STATIC_DRAW);

        // Put texcoords in the buffer
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.texcoordBuffer);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(unitQuad), this.gl.STATIC_DRAW);

        this.resize(this.glCanvas.clientWidth, this.glCanvas.clientHeight);
        this.clear();

        this.gl.disable(this.gl.DEPTH_TEST);
        this.gl.enable(this.gl.BLEND);
        this.gl.blendFunc(this.gl.SRC_ALPHA, this.gl.ONE_MINUS_SRC_ALPHA);

        this.gl.useProgram(this.program);

        const size = 2;
        const type = this.gl.FLOAT;
        const normalize = false;
        const stride = 0;
        const offset = 0;

        this.gl.enableVertexAttribArray(this.positionLocation);
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.positionBuffer);
        this.gl.vertexAttribPointer(this.positionLocation,
            size, type, normalize, stride, offset);
        
        this.gl.enableVertexAttribArray(this.texcoordLocation);
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.texcoordBuffer);
        this.gl.vertexAttribPointer(this.texcoordLocation,
            size, type, normalize, stride, offset);

    }


    /**
     * Creates a webgl context.
     * @param {HTMLCanvasElement} canvas The canvas element to get context for.
     * 
     * @return {WebgGLRenderingContext} The created context.
     */
    getContext(canvas) {
        var gl = null;

        gl = canvas.getContext('webgl', {antialias: false})
            || canvas.getContext('experimental-webgl', {antialias: false});

        return gl;
    }

    compileShader(source, type) {
        const shader = this.gl.createShader(type);
        this.gl.shaderSource(shader, source);
        this.gl.compileShader(shader);

        return shader;
    }

    addTileset(texname, image) {
        const level = 0;
        const internalFormat = this.gl.RGBA;
        const srcFormat = this.gl.RGBA;
        const srcType = this.gl.UNSIGNED_BYTE;

        var tex = this.gl.createTexture();

        this.gl.bindTexture(this.gl.TEXTURE_2D, tex);

        this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_S, this.gl.CLAMP_TO_EDGE);
        this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_T, this.gl.CLAMP_TO_EDGE);
        this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, this.gl.NEAREST);
        this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MAG_FILTER, this.gl.NEAREST);

        this.gl.texImage2D(this.gl.TEXTURE_2D, level, internalFormat, srcFormat, srcType, image);

        this.textures[texname] = {
            width: image.width,
            height: image.height,
            tex: tex
        }

        this.currentTexture = texname;
    }

    setTileset(texname) {
        this.currentTexture = texname;
        this.gl.bindTexture(this.gl.TEXTURE_2D, this.textures[texname].tex);
    }

    resize(w, h) {
        this.gl.viewport(0, 0, w, h);
    }

    clear(c) {
        c = c || [0, 0, 0, 0];

        this.gl.clearColor(c[0], c[1], c[2], c[3]);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT);
    }

    draw(sx, sy, sw, sh, x, y, w, h, angle, origin) {
        angle = angle || 0;
        origin = origin || [0, 0];        

        let matrix = m3.projection(this.glCanvas.clientWidth, this.glCanvas.clientHeight);
        matrix = m3.translate(matrix, x, y);
        matrix = m3.rotate(matrix, degToRad(angle));
        matrix = m3.translate(matrix, -origin[0], -origin[1]);
        matrix = m3.scale(matrix, w, h);

        this.gl.uniformMatrix3fv(this.matrixLocation, false, matrix);

        let tw = this.textures[this.currentTexture].width;
        let th = this.textures[this.currentTexture].height;
        
        let texMatrix = m3.translation(sx / tw, sy / th, 0);
        texMatrix = m3.scale(texMatrix, sw / tw, sh / th, 1);

        this.gl.uniformMatrix3fv(this.textureMatrixLocation, false, texMatrix);

        const primitiveType = this.gl.TRIANGLES;
        const offset = 0;
        const count = 6;

        this.gl.drawArrays(primitiveType, offset, count);
    }
}

