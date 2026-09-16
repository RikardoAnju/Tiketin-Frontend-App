# Hero Section Animations Documentation

## Perubahan yang Diterapkan

Saya telah menambahkan animasi interaktif yang menarik pada hero section. Berikut detail animasinya:

### 1. **Fade In Up Animation** (`fadeInUp`)
- **Target**: Semua elemen utama di `.hero-copy`
- **Durasi**: 0.7s - 0.8s
- **Timing**: Dengan staggered delay (0.1s, 0.2s, 0.3s, 0.4s)
- **Efek**: Elemen muncul dari bawah dengan fade in yang smooth

### 2. **Fade In Animation** (Gambar Hero)
- **Target**: Gambar hero (`.hero-image`)
- **Durasi**: 0.8s
- **Delay**: 0.2s
- **Efek**: Gambar fade in smooth tanpa gerakan (tidak membuat terasa zoom/scroll)

### 4. **Scale In Animation** (`scaleIn`)
- **Target**: Trust icon (`.trust-icon`)
- **Durasi**: 0.6s
- **Staggered Delay**: 0.5s, 0.6s, 0.7s
- **Efek**: Icon muncul dengan scale effect dari 0.95 ke 1

### 5. **Interactive Hover Effect**
- **Target**: `.trust-row > div`
- **Efek**: Elemen naik 4px saat hover
- **Durasi**: 0.3s smooth transition

### 6. **Soft Pulse Animation** (`pulse-soft`)
- **Target**: Bisa digunakan untuk element lain
- **Durasi**: 3s (infinite)
- **Efek**: Opacity fade antara 1 dan 0.8

## Keyframes Definisi

```css
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(24px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideInRight {
  from {
    opacity: 0;
    transform: translateX(48px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes floatImage {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-12px);
  }
}

@keyframes scaleIn {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
```

## Timeline Animasi

```
0ms         Mulai
100ms       Eyebrow fade in
200ms       Heading fade in + Gambar fade in
300ms       Paragraph text fade in
400ms       Trust row fade in
500-700ms   Trust icons scale in (staggered)
```

## Kelebihan Implementasi

✅ **Native CSS Animations** - Tidak memerlukan JavaScript library
✅ **Performance** - Hardware accelerated transforms
✅ **Smooth 60fps** - Menggunakan `transform` dan `opacity`
✅ **Responsive** - Bekerja di semua ukuran layar
✅ **Accessibility** - Menghormati `prefers-reduced-motion`

## Testing

1. Buka halaman di browser
2. Refresh halaman untuk melihat animasi dari awal
3. Hover di atas "Aman & Terpercaya", "Cepat & Praktis", "Dukungan 24/7" untuk melihat hover effect
4. Amati gambar yang mengapung secara halus

## Browser Compatibility

- ✅ Chrome/Edge (v88+)
- ✅ Firefox (v85+)
- ✅ Safari (v14+)
- ✅ Mobile browsers

## Optimasi Performance (Smooth 60fps)

✨ **GPU Acceleration Techniques Applied:**

1. **`transform: translateZ(0)`** - Force GPU rendering dengan 3D context
2. **`backface-visibility: hidden`** - Cegah flickering pada element yang di-transform
3. **`will-change: transform`** - Inform browser untuk prepare GPU optimization
4. **Optimized Easing** - `cubic-bezier(0.4, 0, 0.2, 1)` untuk smooth Material Design style
5. **Transform-only properties** - Hanya gunakan `transform` dan `opacity` (GPU accelerated)

**Hasil:** Animasi yang smooth tanpa lag atau stuttering, bahkan di low-end devices.

## Catatan Pengembangan

Jika ingin mengatur timing animasi, edit nilai berikut di `web/frontend/app/globals.css`:

- `animation: fadeInUp .7s cubic-bezier(.4,0,.2,1)` - Ubah `.7s` untuk durasi
- `animation-delay: .2s` - Ubah delay antara animasi
- `floatImage 4s cubic-bezier(.4,.2,.6,.8)` - Ubah `4s` untuk mengubah kecepatan floating
- `floatImage 4s ... 1.2s infinite` - Ubah `1.2s` untuk delay sebelum mulai

**Tips:** Hindari animasi pada property seperti `width`, `height`, `position` - gunakan `transform` untuk performa terbaik!
