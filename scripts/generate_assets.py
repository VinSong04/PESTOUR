"""
Generate PES TOUR PWA assets (OG banner + icons) using Pillow.
Run: python3 scripts/generate_assets.py
"""
import os
import math
from PIL import Image, ImageDraw, ImageFont

PUBLIC = os.path.join(os.path.dirname(__file__), '..', 'public')
ICONS_DIR = os.path.join(PUBLIC, 'icons')
os.makedirs(ICONS_DIR, exist_ok=True)

# ── Colors ───────────────────────────────────────────────────────────────────
BG        = (6, 10, 19)       # #060A13
WHITE     = (241, 245, 249)   # #F1F5F9
GOLD      = (239, 159, 39)    # #EF9F27
PITCH     = (255, 255, 255)   # pitch lines at low alpha

def draw_pitch_lines(draw, w, h, alpha=18):
    """Draw a faint top-down football pitch overlay."""
    c = (*PITCH, alpha)
    pad_x, pad_y = int(w * 0.06), int(h * 0.08)

    # Outer boundary
    draw.rectangle([pad_x, pad_y, w - pad_x, h - pad_y], outline=c, width=2)

    # Centre line
    cx = w // 2
    draw.line([(cx, pad_y), (cx, h - pad_y)], fill=c, width=2)

    # Centre circle
    r = int(min(w, h) * 0.12)
    draw.ellipse([cx - r, h // 2 - r, cx + r, h // 2 + r], outline=c, width=2)
    draw.ellipse([cx - 4, h // 2 - 4, cx + 4, h // 2 + 4], fill=c)

    # Left penalty area
    pa_w = int(w * 0.15)
    pa_h = int(h * 0.55)
    px, py = pad_x, (h - pa_h) // 2
    draw.rectangle([px, py, px + pa_w, py + pa_h], outline=c, width=2)

    # Right penalty area
    draw.rectangle([w - pad_x - pa_w, py, w - pad_x, py + pa_h], outline=c, width=2)

    # Left goal area
    ga_w = int(pa_w * 0.5)
    ga_h = int(pa_h * 0.4)
    gx, gy = pad_x, (h - ga_h) // 2
    draw.rectangle([gx, gy, gx + ga_w, gy + ga_h], outline=c, width=2)

    # Right goal area
    draw.rectangle([w - pad_x - ga_w, gy, w - pad_x, gy + ga_h], outline=c, width=2)


def get_font(size):
    """Try to load a bold system font, fall back to default."""
    candidates = [
        '/System/Library/Fonts/Supplemental/Impact.ttf',
        '/System/Library/Fonts/Helvetica.ttc',
        '/System/Library/Fonts/Arial Bold.ttf',
        '/Library/Fonts/Arial Bold.ttf',
    ]
    for path in candidates:
        if os.path.exists(path):
            try:
                return ImageFont.truetype(path, size)
            except Exception:
                pass
    return ImageFont.load_default()


# ── OG Banner (1200×630) ─────────────────────────────────────────────────────
def make_og_banner():
    W, H = 1200, 630
    img = Image.new('RGBA', (W, H), (*BG, 255))
    draw = ImageDraw.Draw(img, 'RGBA')

    draw_pitch_lines(draw, W, H, alpha=22)

    # Subtle top-left glow
    for i in range(10, 200, 20):
        alpha = int(25 * (1 - i / 200))
        draw.ellipse([-50, -50, i * 2, i * 2], fill=(34, 211, 238, alpha))

    # Title "PES TOUR"
    font_title = get_font(160)
    title = "PES TOUR"
    bbox = draw.textbbox((0, 0), title, font=font_title)
    tw, th = bbox[2] - bbox[0], bbox[3] - bbox[1]
    tx = (W - tw) // 2
    ty = H // 2 - th - 20

    # Drop shadow
    draw.text((tx + 4, ty + 4), title, font=font_title, fill=(0, 0, 0, 180))
    draw.text((tx, ty), title, font=font_title, fill=WHITE)

    # Subtitle "Legends Start Here"
    font_sub = get_font(56)
    sub = "Legends Start Here"
    bbox2 = draw.textbbox((0, 0), sub, font=font_sub)
    sw = bbox2[2] - bbox2[0]
    sx = (W - sw) // 2
    sy = ty + th + 18
    draw.text((sx, sy), sub, font=font_sub, fill=GOLD)

    # Gold accent line under subtitle
    line_y = sy + (bbox2[3] - bbox2[1]) + 16
    draw.rectangle([sx, line_y, sx + sw, line_y + 3], fill=GOLD)

    out = os.path.join(PUBLIC, 'og-banner.png')
    img.convert('RGB').save(out, 'PNG', optimize=True)
    print(f'✓ og-banner.png saved ({W}×{H})')
    return out


# ── PWA Icon (512×512 + 192×192) ─────────────────────────────────────────────
def make_icon(size):
    W = H = size
    img = Image.new('RGBA', (W, H), (*BG, 255))
    draw = ImageDraw.Draw(img, 'RGBA')

    # Gold border ring
    bw = max(3, size // 64)
    pad = max(4, size // 32)
    r = size // 8
    draw.rounded_rectangle([pad, pad, W - pad, H - pad], radius=r,
                            outline=(*GOLD, 220), width=bw)

    # Background glow
    cx, cy = W // 2, H // 2
    for i in range(60, 0, -10):
        alpha = int(8 * (i / 60))
        draw.ellipse([cx - i*2, cy - i*2, cx + i*2, cy + i*2],
                     fill=(239, 159, 39, alpha))

    # "PT" monogram
    font_size = int(size * 0.55)
    font = get_font(font_size)
    text = "PT"
    bbox = draw.textbbox((0, 0), text, font=font)
    tw, th = bbox[2] - bbox[0], bbox[3] - bbox[1]
    tx = (W - tw) // 2
    ty = (H - th) // 2 - th // 10

    # Shadow
    draw.text((tx + 3, ty + 3), text, font=font, fill=(0, 0, 0, 160))
    # Gold "T" — draw P in white, T in gold by splitting
    # Simple approach: draw full word white, then gold accent
    draw.text((tx, ty), text, font=font, fill=WHITE)

    # Gold underline accent
    ul_y = ty + th + int(size * 0.02)
    ul_x = tx + tw // 4
    draw.rectangle([ul_x, ul_y, ul_x + tw // 2, ul_y + max(2, size // 128)], fill=GOLD)

    out = os.path.join(ICONS_DIR, f'icon-{size}.png')
    img.convert('RGB').save(out, 'PNG', optimize=True)
    print(f'✓ icon-{size}.png saved')
    return out


if __name__ == '__main__':
    make_og_banner()
    make_icon(512)
    make_icon(192)
    # Copy 192 as favicon fallback
    img192 = Image.open(os.path.join(ICONS_DIR, 'icon-192.png'))
    img32 = img192.resize((32, 32), Image.LANCZOS)
    img32.save(os.path.join(ICONS_DIR, 'favicon-32.png'), 'PNG')
    print('✓ favicon-32.png saved')
    print('\nAll assets generated successfully!')
