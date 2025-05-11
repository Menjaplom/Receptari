type HSL = { h: number; s: number; l: number }

// Yanked from https://stackoverflow.com/questions/43193341/how-to-generate-random-pastel-or-brighter-color-in-javascript
export function newHSLPastel() : HSL {
  return { 
    h: 360 * Math.random(),
    s: 25 + 70 * Math.random(),
    l: 85 + 10 * Math.random()
  }
}

export function HSLToStr(hsl: HSL ): string {
  return "hsl(" + hsl.h + ',' + hsl.s + '%,' + hsl.l + '%)'
}

// Yanked from https://www.jameslmilner.com/posts/converting-rgb-hex-hsl-colors/
export function HSLToHexStr(hsl: HSL ): string {
    const { h, s, l } = hsl;
  
    const hDecimal = l / 100;
    const a = (s * Math.min(hDecimal, 1 - hDecimal)) / 100;
    const f = (n: number) => {
      const k = (n + h / 30) % 12;
      const color = hDecimal - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
  
      // Convert to Hex and prefix with "0" if required
      return Math.round(255 * color)
        .toString(16)
        .padStart(2, "0");
    };
    return `#${f(0)}${f(8)}${f(4)}`;
  }