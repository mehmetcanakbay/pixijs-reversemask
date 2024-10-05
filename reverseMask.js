import { Filter, FilterSystem, GlProgram, Matrix, Texture, TextureMatrix, UniformGroup } from 'pixi.js';
import fragment from './reverseMask.frag?raw';
import vertex from './reverseMask.vert?raw';

export class ReverseMaskFilter extends Filter
{
    constructor(sprite)
    {
        const rest = {};
        const textureMatrix = new TextureMatrix(sprite.texture);

        const filterUniforms = new UniformGroup({
            uFilterMatrix: { value: new Matrix(), type: 'mat3x3<f32>' },
            uMaskClamp: { value: textureMatrix.uClampFrame, type: 'vec4<f32>' },
            uAlpha: { value: 1, type: 'f32' },
        });

        const glProgram = GlProgram.from({
            vertex,
            fragment,
            name: 'reversemask-filter',
        });

        super({
            ...rest,
            undefined,
            glProgram,
            resources: {
                filterUniforms,
                uMaskTexture: sprite.texture.source,
            },
        });

        this.sprite = sprite;

        this._textureMatrix = textureMatrix;
    }

    apply(
        filterManager,
        input,
        output,
        clearMode
    )
    {
        // will trigger an update if the texture changed..
        this._textureMatrix.texture = this.sprite.texture;

        filterManager.calculateSpriteMatrix(
            this.resources.filterUniforms.uniforms.uFilterMatrix,
            this.sprite
        ).prepend(this._textureMatrix.mapCoord);

        this.resources.uMaskTexture = this.sprite.texture.source;

        filterManager.applyFilter(this, input, output, clearMode);
    }
}