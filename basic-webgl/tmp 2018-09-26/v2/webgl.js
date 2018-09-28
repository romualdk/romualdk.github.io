var Webgl = {
    /**
     * Attributes
     * ----------------------------------------------------
     * 
     * vec2 p - quad vecrtex position
     * x = p.x
     * y = p.y
     * 
     * vec4 s - source (texture) position and size
     * sx = s.x
     * sy = s.y
     * sw = s.z
     * sh = z.w
     * 
     * vec4 d - destination (sprite) position and size
     * dx = d.x
     * dy = d.y
     * dw = d.z
     * dh = d.w
     * 
     * vec3 o - origin (on texture) and angle (of sprite)
     * ox = o.x
     * oy = o.y
     * a  = o.z
     * 
     * Uniforms
     * ------------------------------------------------------
     * 
     * vec2 ss - soruce (texture) size
     * w = ss.x
     * h = ss.y
     * 
     * mat3 sp - screen projection matrix
     */
    _vertexShader: `
    attribute vec2 position;
    attribute vec2 anchor;
    attribute vec2 scale;
    attribute float rotation;
    attribute vec2 translation;
    attribute vec4 uv;

    uniform mat3 projection;
    uniform vec2 texsize;

    varying vec2 texcoord;

    void main() {
        float q = cos(rotation);
        float w = sin(rotation);

        // move to anchor and scale
        vec2 p = (position - anchor) * scale;

        // rotate
        p = vec2(p.x * q - p.y * w, p.x * w + p.y * q);

        // move back from anchor and translate
        p += anchor + translation;

        gl_Position = vec4((projection * vec3(p, 1)).xy, 0, 1);

        // Texture coordinates
        texcoord = vec2(
            (position.x * uv.z + uv.x) / texsize.x,
            (position.y * uv.w + uv.y) / texsize.y
            );
    }`,

    // Textrue shader
    _fragmentShader: `
    precision mediump float;

    uniform sampler2D u_texture;

    varying vec2 texcoord;    

    void main() {
        gl_FragColor = texture2D(u_texture, texcoord);
    }`,

    _quad: [0,0, 0,1, 1,0, 1,0, 0,1, 1,1],

    getContext: function(canvas) {
        var options = {antialias: false};
        var gl = null;

        gl = canvas.getContext('webgl', options)
            || canvas.getContext('experimental-webgl', options);
    
        if(gl && gl instanceof WebGLRenderingContext) {
            this.resize(gl, canvas.width, canvas.height);

            return gl;
        }
        else {
            return false;
        }
    },

    init: function(gl) {
        this._setup(gl);
        this.clear(gl);
    },

    resize: function(gl, w, h) {
        gl._width = w;
        gl._height = h;
        gl.viewport(0, 0, w, h);
    },

    clear: function(gl, c) {
        c = c || [0, 0, 0, 0];

        if(!c[3]) {
            c[3] = 1;
        }

        for(var i in c) {
            c[i] = c[i] / 255;
        }

        gl.clearColor(c[0], c[1], c[2], c[3]);
        gl.clear(gl.COLOR_BUFFER_BIT);
    },

    getTileset: function(gl, img) {
        var level = 0;
        var internalFormat = gl.RGBA;
        var srcFormat = gl.RGBA;
        var srcType = gl.UNSIGNED_BYTE;

        var texture = gl.createTexture();

        gl.bindTexture(gl.TEXTURE_2D, texture);

        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);

        gl.texImage2D(gl.TEXTURE_2D, level, internalFormat, srcFormat, srcType, img);

        var texsize = [image.width, image.height];
        gl.uniform2fv(gl._uniform['texsize'].location, new Float32Array(texsize));


        return {
            width: image.width,
            height: image.height,
            texture: texture
        }
    },

    setTileset: function(gl, tls) {
        gl._textureWidth = tls.width;
        gl._textureHeight = tls.height;

        var texsize = [tls.width, tls.height];
        gl.uniform2fv(gl._uniform['texsize'].location, new Float32Array(texsize));


        return gl.bindTexture(gl.TEXTURE_2D, tls.texture);
    },

    /**
     * [sx,sy, sw,sh, x,y, w,h, a, ox,oy]
     */
    drawSprites: function(gl, sprites) {
        // Set uniform
        var projection = m3.projection(gl._width, gl._height);
        gl.uniformMatrix3fv(gl._uniform['projection'].location, false, projection);

        // Prepare data
        var data = {
            position: [],
            anchor: [],
            scale: [],
            rotation: [],
            translation: [],
            uv: []
        }
       
        for(var i in sprites) {
            for(var ii = 0; ii < 6; ii++) {
                // vertex data
                data.position.push(this._quad[ii*2], this._quad[ii*2 + 1]);
                data.anchor.push(sprites[i].ox / sprites[i].w, sprites[i].oy / sprites[i].h);
                data.scale.push(sprites[i].w, sprites[i].h);
                data.rotation.push(degToRad(sprites[i].a));
                data.translation.push(sprites[i].x, sprites[i].y);

                // uv (texture) data
                data.uv.push(sprites[i].sx, sprites[i].sy, sprites[i].sw, sprites[i].sh);
            }
        }

        // Fill data buffers
        for(var i in data) {
            this._fillBuffer(gl, i, new Float32Array(data[i]));
        }

        // Draw
        gl.drawArrays(gl.TRIANGLES, 0, 6 * sprites.length);
    },

    _setup: function(gl) {
        // Setup GLSL program
        gl._program = gl.createProgram();
        gl.attachShader(gl._program,
            this._compileShader(gl, this._vertexShader, gl.VERTEX_SHADER));
        gl.attachShader(gl._program,
            this._compileShader(gl, this._fragmentShader, gl.FRAGMENT_SHADER));
        gl.linkProgram(gl._program);
        gl.useProgram(gl._program);

        // Set options
        gl.disable(gl.DEPTH_TEST);
        gl.enable(gl.BLEND);
        gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

        // Prepare attributes
        gl._attrib = {};
        
        var attribs = ['position', 'anchor', 'scale',
        'rotation', 'translation', 'uv'];
        var sizes = [2,2,2,1,2,4];

        for(var i in attribs) {
            this._setAttrib(gl, attribs[i], sizes[i]);
        }

        // Prepare uniforms
        gl._uniform = {};

        var uniforms = ['projection', 'texsize'];

        for(var i in uniforms) {
            gl._uniform[uniforms[i]] = {
                location: gl.getUniformLocation(gl._program, uniforms[i])
            }
        }
    },

    _setAttrib: function(gl, name, size) {
        gl._attrib[name] = {
            location: gl.getAttribLocation(gl._program, name),
            buffer: gl.createBuffer()
        };

        gl.enableVertexAttribArray(gl._attrib[name].location);
        gl.bindBuffer(gl.ARRAY_BUFFER, gl._attrib[name].buffer);
        gl.vertexAttribPointer(gl._attrib[name].location, size, gl.FLOAT, false, 0, 0);
    },

    _fillBuffer(gl, name, content) {
        gl.bindBuffer(gl.ARRAY_BUFFER, gl._attrib[name].buffer);
        gl.bufferData(gl.ARRAY_BUFFER, content, gl.STATIC_DRAW);
    },

    _compileShader: function(gl, src, type) {
        var shader = gl.createShader(type);
        gl.shaderSource(shader, src);
        gl.compileShader(shader);

        return shader;
    }
}