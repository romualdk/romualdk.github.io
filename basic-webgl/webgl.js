
const VERTEX_SHADER = `attribute vec2 g;
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
gl_Position=m*vec4(p,z,1);}`;

const FRAGMENT_SHADER = `precision mediump float;
uniform sampler2D x;
uniform float j;
varying vec2 v;
varying vec4 i;
void main(){
vec4 c=texture2D(x,v);
gl_FragColor=c*i;
if(j>0.0){
if(c.a<j)discard;
gl_FragColor.a=1.0;};}`;

class WebglRenderer {
    constructor(canvas) {
        this.glCanvas = canvas;

        this.gl = this.glCanvas.getContext('webgl');

        this.shaderProgram = this.gl.createProgram();
        this.gl.attachShader(this.shaderProgram, this.compileShader(VERTEX_SHADER, this.gl.VERTEX_SHADER));
        this.gl.attachShader(this.shaderProgram, this.compileShader(FRAGMENT_SHADER, this.gl.FRAGMENT_SHADER));
        this.gl.linkProgram(this.shaderProgram);

        this.aspectRatio = this.glCanvas.width / this.glCanvas.height;
        this.currentRotation = [0, 1];
        this.currentScale = [1.0, this.aspectRatio];

        this.vertexArray = new Float32Array([
            -0.5, 0.5, 0.5, 0.5, 0.5, -0.5,
            -0.5, 0.5, 0.5, -0.5, -0.5, -0.5
        ]);
      
        this.vertexBuffer = this.gl.createBuffer();
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.vertexBuffer);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, this.vertexArray, this.gl.STATIC_DRAW);

        this.ertexNumComponents = 2;
        this.vertexCount = this.vertexArray.length / this.vertexNumComponents;

        this.currentAngle = 0.0;
        this.rotationRate = 6;
    }

    compileShader(source, type) {
        const shader = this.gl.createShader(type);
        this.gl.shaderSource(shader, source);
        this.gl.compileShader(shader);

        return shader;
    }

    update() {
        this.gl.viewport(0, 0, this.glCanvas.width, this.glCanvas.height);
        this.gl.clearColor(0.8, 0.9, 1.0, 1.0);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT);

        this.gl.useProgram(this.shaderProgram);

        this.uScalingFactor = this.gl.getUniformLocation(this.shaderProgram, "uScalingFactor");
        this.uGlobalColor = this.gl.getUniformLocation(this.shaderProgram, "uGlobalColor");
        this.uRotationVector = this.gl.getUniformLocation(this.shaderProgram, "uRotationVector");

        this.gl.uniform2fv(this.uScalingFactor, this.currentScale);
        this.gl.uniform2fv(this.uRotationVector, this.currentRotation);
        this.gl.uniform4fv(this.uGlobalColor, [0.1, 0.7, 0.2, 1.0]);

        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.vertexBuffer);

        this.aVertexPosition = this.gl.getAttribLocation(this.shaderProgram, "aVertexPosition");

        this.gl.enableVertexAttribArray(this.aVertexPosition);
        this.gl.vertexAttribPointer(this.aVertexPosition, this.vertexNumComponents, this.gl.FLOAT, false, 0, 0);

        this.gl.drawArrays(this.gl.TRIANGLES, 0, this.vertexCount);

        
    }

    loadImage(image) {
        this.texture = this.gl.createTexture();
        this.gl.bindTexture(this.gl.TEXTURE_2D, this.texture);

        const level = 0;
        const internalFormat = this.gl.RGBA;
        const srcFormat = this.gl.RGBA;
        const srcType = this.gl.UNSIGNED_BYTE;

        this.gl.bindTexture(this.gl.TEXTURE_2D, this.texture);
        this.gl.texImage2D(this.gl.TEXTURE_2D, level, internalFormat, srcFormat, srcType, image);

        
    }


}

