# Usage

```js
const swooshMask = new PIXI.Sprite(PIXI.Texture.WHITE);
temp_container.addChild(swooshMask);
swooshMask.alpha = 0.0;
    
const maskfilter = new ReverseMaskFilter(swooshMask)
swooshSprite.filters = [maskfilter];
```

# Example

![Untitled video - Made with Clipchamp](https://github.com/user-attachments/assets/b380955e-2560-4e6f-89d1-f8566e7098d8)

### Notes

Pixi got a new PR that added this feature which was merged into their dev branch 3 days ago (and I snatched his edited-shader code). So this feature should be in future versions, but for now, you can use this. 
