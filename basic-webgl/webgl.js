
// 2D vertex shader source
const VERTEX_SHADER = `attribute vec2 a_position;
attribute vec2 a_texCoord;

uniform vec2 u_resolution;

varying vec2 v_texCoord;

void main() {
   // convert the rectangle from pixels to 0.0 to 1.0
   vec2 zeroToOne = a_position / u_resolution;

   // convert from 0->1 to 0->2
   vec2 zeroToTwo = zeroToOne * 2.0;

   // convert from 0->2 to -1->+1 (clipspace)
   vec2 clipSpace = zeroToTwo - 1.0;

   gl_Position = vec4(clipSpace * vec2(1, -1), 0, 1);

   // pass the texCoord to the fragment shader
   // The GPU will interpolate this value between points.
   v_texCoord = a_texCoord;
}`;

// 2D fragment shader source
const FRAGMENT_SHADER = `precision mediump float;

// our texture
uniform sampler2D u_image;

// the texCoords passed in from the vertex shader.
varying vec2 v_texCoord;

void main() {
   gl_FragColor = texture2D(u_image, v_texCoord);
}`;

class WebglRenderer {
    constructor(canvas) {
        // Get a Webgl context
        this.glCanvas = canvas;
        this.gl = this.get2DContext(this.glCanvas);

        // Setup shaders and buffers
        this.init();
    }

    init() {
        // Setup GLSL program
        this.program = this.gl.createProgram();
        this.gl.attachShader(this.program, this.compileShader(VERTEX_SHADER, this.gl.VERTEX_SHADER));
        this.gl.attachShader(this.program, this.compileShader(FRAGMENT_SHADER, this.gl.FRAGMENT_SHADER));
        this.gl.linkProgram(this.program);

        // Look up where the vertex data needs to go
        this.positionLocation = this.gl.getAttribLocation(this.program, 'a_position');
        this.texcoordLocation = this.gl.getAttribLocation(this.program, 'a_texCoord');

        // Create buffer to put three 2d clip space points in
        this.positionBuffer = this.gl.createBuffer();
        this.texcoordBuffer = this.gl.createBuffer();

        this.resolutionLocation = this.gl.getUniformLocation(this.program, "u_resolution");
    }


    /**
     * Creates a webgl context.
     * @param {HTMLCanvasElement} canvas The canvas element to get context for.
     * 
     * @return {WebgGLRenderingContext} The created context.
     */
    get2DContext(canvas) {
        var gl = null;

        gl = canvas.getContext('webgl')
            || canvas.getContext('experimental-webgl');

        return gl;
    }

    compileShader(source, type) {
        const shader = this.gl.createShader(type);
        this.gl.shaderSource(shader, source);
        this.gl.compileShader(shader);

        return shader;
    }

    addTileset(image) {
        const level = 0;
        const internalFormat = this.gl.RGBA;
        const srcFormat = this.gl.RGBA;
        const srcType = this.gl.UNSIGNED_BYTE;

        this.texture = this.gl.createTexture();
        //this.gl.bindTexture(this.gl.TEXTURE_2D, this.texture);

        

        this.gl.bindTexture(this.gl.TEXTURE_2D, this.texture);

        // Set the parameters so we can render any size image.
        this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_S, this.gl.CLAMP_TO_EDGE);
        this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_T, this.gl.CLAMP_TO_EDGE);
        this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, this.gl.NEAREST);
        this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MAG_FILTER, this.gl.NEAREST);

        this.gl.texImage2D(this.gl.TEXTURE_2D, level, internalFormat, srcFormat, srcType, image);

    }

    addSprite(x, y, width, height) {
        let x1 = x;
        let x2 = x + width;
        let y1 = y;
        let y2 = y + height;

        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.positionBuffer);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array([
            x1, y1,
            x2, y1,
            x1, y2,
            x1, y2,
            x2, y1,
            x2, y2
        ]), this.gl.STATIC_DRAW);

        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.texcoordBuffer);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array([
            0.0,  0.0,
            1.0,  0.0,
            0.0,  1.0,
            0.0,  1.0,
            1.0,  0.0,
            1.0,  1.0
        ]), this.gl.STATIC_DRAW);
    }

    render() {
        this.gl.viewport(0, 0, this.glCanvas.width, this.glCanvas.height);

        this.gl.clearColor(0, 0, 1, 1);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT);

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

        this.gl.uniform2f(this.resolutionLocation, this.glCanvas.width, this.glCanvas.height);

        const primitiveType = this.gl.TRIANGLES;
        //const offset = 0;
        const count = 6;

        this.gl.drawArrays(primitiveType, offset, count);
    }


}

