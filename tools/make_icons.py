from PIL import Image, ImageDraw
import math
def globe(size, pad_ratio=0.16):
    S = size*4
    im = Image.new("RGBA", (S, S), (11, 18, 32, 255))
    d = ImageDraw.Draw(im)
    # subtle gradient
    for y in range(S):
        t = y/S
        c = (int(11+20*t), int(18+30*t), int(32+50*t), 255)
        d.line([(0,y),(S,y)], fill=c)
    p = int(S*pad_ratio); r = (S-2*p)//2; cx = cy = S//2
    d.ellipse([cx-r, cy-r, cx+r, cy+r], fill=(30, 110, 200, 255))
    w = max(4, S//90); line = (190, 230, 255, 255)
    d.ellipse([cx-r, cy-r, cx+r, cy+r], outline=line, width=w)
    for f in (0.35, 0.72):
        rx = int(r*f); d.ellipse([cx-rx, cy-r, cx+rx, cy+r], outline=line, width=w)
    d.line([(cx, cy-r), (cx, cy+r)], fill=line, width=w)
    for lat in (-0.5, 0, 0.5):
        y = cy + int(r*lat); hw = int(r*math.sqrt(1-lat*lat))
        d.line([(cx-hw, y), (cx+hw, y)], fill=line, width=w)
    # orbit accent
    # d.arc([cx-r-p//2, cy-r//3, cx+r+p//2, cy+r//3], 200, 340, fill=(255, 190, 70, 255), width=w*2)
    return im.resize((size, size), Image.LANCZOS)
for s, n in [(180, "apple-touch-icon.png"), (192, "icon-192.png"), (512, "icon-512.png")]:
    globe(s).convert("RGB").save("icons/"+n)
globe(512, 0.24).convert("RGB").save("icons/icon-maskable-512.png")
globe(32).save("icons/favicon-32.png")
