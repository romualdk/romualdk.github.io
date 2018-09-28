
// 2D vertex shader source
const VERTEX_SHADER = `
    attribute vec2 a_position;
    attribute vec2 a_texCoord;

    uniform vec2 u_resolution;
    uniform mat3 u_matrix;

    varying vec2 v_texCoord;

    void main() {
        // Multiply the position by the matrix.
        vec2 position = (u_matrix * vec3(a_position, 1)).xy;

        // convert the position from pixels to 0.0 to 1.0
        vec2 zeroToOne = position / u_resolution;

        // convert from 0->1 to 0->2
        vec2 zeroToTwo = zeroToOne * 2.0;

        // convert from 0->2 to -1->+1 (clipspace)
        vec2 clipSpace = zeroToTwo - 1.0;

        gl_Position = vec4(clipSpace * vec2(1, -1), 0, 1);

        v_texCoord = a_texCoord;
    }`;

/**
 * attribute vec2 a_position;
attribute vec2 a_texCoord;
uniform mat3 u_matrix;


varying vec2 v_texCoord;

void main() {
   gl_Position = vec4((u_matrix * vec3(a_position, 1)).xy, 0, 1);


   
}
 */


// 2D fragment shader source
const FRAGMENT_SHADER = `precision mediump float;
uniform sampler2D u_image;
varying vec2 v_texCoord;

void main() {
   gl_FragColor = texture2D(u_image, v_texCoord);
}`;


/**
 * 2D vertex shader
 * g - vertex
 * a - anchor
 * t - translation
 * r - rotation
 * s - scale
 * u - uvs
 * c - color
 * z - z index
 * m - matrix
 */
const VERTEX_SHADER_2D = `
    attribute vec2 g;
    attribute vec2 a;
    attribute vec2 t;
    attribute float r;
    attribute vec2 s;
    attribute vec4 u;
    attribute vec4 c;
    attribute float z;

    uniform mat4 m;

    varying vec2 v;
    varying vec4 i;

    void main(){
        v=u.xy+g*u.zw;
        i=c.abgr;
        vec2 p=(g-a)*s;
        float q=cos(r);
        float w=sin(r);
        p=vec2(p.x*q-p.y*w,p.x*w+p.y*q);
        p+=a+t;
        gl_Position=m*vec4(p,z,1);
    }`;

/**
 * 2D fragment shader
 * x - texture
 * j - alpha test
 * v - 
 * i - 
 */
const FRAGMENT_SHADER_2D = `
    precision mediump float;

    uniform sampler2D x;
    uniform float j;

    varying vec2 v;
    varying vec4 i;

    void main(){
        vec4 c=texture2D(x,v);
        gl_FragColor=c*i;
        if(j>0.0){
        if(c.a<j)discard;
        gl_FragColor.a=1.0;};
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
        this.sprites = [];

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
        this.matrixLocation = this.gl.getUniformLocation(this.program, "u_matrix");
    }


    /**
     * Creates a webgl context.
     * @param {HTMLCanvasElement} canvas The canvas element to get context for.
     * 
     * @return {WebgGLRenderingContext} The created context.
     */
    get2DContext(canvas) {
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

    addTileset(image) {
        const level = 0;
        const internalFormat = this.gl.RGBA;
        const srcFormat = this.gl.RGBA;
        const srcType = this.gl.UNSIGNED_BYTE;

        this.texture = this.gl.createTexture();

        this.gl.bindTexture(this.gl.TEXTURE_2D, this.texture);

        this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_S, this.gl.CLAMP_TO_EDGE);
        this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_T, this.gl.CLAMP_TO_EDGE);
        this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, this.gl.NEAREST);
        this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MAG_FILTER, this.gl.NEAREST);

        this.gl.texImage2D(this.gl.TEXTURE_2D, level, internalFormat, srcFormat, srcType, image);

    }

    addSprite(x, y, width, height) {
        this.sprites[0] = {
            x: x,
            y: y,
            width: width,
            height: height,
            halfWidth: width / 2,
            halfHeight: height / 2,
            angle: 0,
            scale: [1,1]
        }

        console.log(this.sprites[0].halfWidth);

        this.updateSprite(0);
    }

    updateSprite(i) {
        let x1 = -this.sprites[i].halfWidth;
        let x2 = this.sprites[i].halfWidth;
        let y1 = -this.sprites[i].halfHeight;
        let y2 = this.sprites[i].halfHeight;

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

        this.gl.clearColor(0, 0, 0, 0);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT);

        this.gl.disable(this.gl.DEPTH_TEST);
        this.gl.enable(this.gl.BLEND);
        this.gl.blendFunc(this.gl.SRC_ALPHA, this.gl.ONE_MINUS_SRC_ALPHA);

        this.gl.useProgram(this.program);

        this.gl.uniform2f(this.resolutionLocation, this.glCanvas.width, this.glCanvas.height);

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


        // Compute matrix
        
        /*var matrix = m3.projection(this.glCanvas.width, this.glCanvas.height);
        matrix = m3.translate(matrix, this.sprites[0].x, this.sprites[0].y);
        matrix = m3.rotate(matrix, degToRad(this.sprites[0].angle));
        matrix = m3.scale(matrix, this.sprites[0].scale[0], this.sprites[0].scale[1]);*/



        

        // Set the matrix.
        //this.gl.uniformMatrix3fv(this.matrixLocation, false, matrix);

        var translation = [this.sprites[0].x, this.sprites[0].y];
        var angleInRadians = degToRad(this.sprites[0].angle);
        var scale = [this.sprites[0].scale[0], this.sprites[0].scale[1]];

        var translationMatrix = m3.translation(translation[0], translation[1]);
        var rotationMatrix = m3.rotation(angleInRadians);
        var scaleMatrix = m3.scaling(scale[0], scale[1]);

        // make a matrix that will move the origin of the 'F' to its center.
        var moveOriginMatrix = m3.translation(-16, -16);

        // Multiply the matrices.
        var matrix = m3.multiply(translationMatrix, rotationMatrix);
        matrix = m3.multiply(matrix, scaleMatrix);
        matrix = m3.multiply(matrix, moveOriginMatrix);

        // Set the matrix.
        this.gl.uniformMatrix3fv(this.matrixLocation, false, matrix);


        const primitiveType = this.gl.TRIANGLES;
        //const offset = 0;
        const count = 6;

        this.gl.drawArrays(primitiveType, offset, count);
    }


}

