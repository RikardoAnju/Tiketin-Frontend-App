/**
 * Pusat semua warna & gradient aplikasi.
 * Komponen tinggal import dari sini, tidak perlu hardcode hex/gradient string.
 * Nilai dasar (blue, navy, orange, muted, line) harus selaras dengan CSS variables di app/globals.css (:root).
 */

export const colors = {
  blue: "#0866f5",
  navy: "#10234d",
  orange: "#ff7600",
  muted: "#53627b",
  line: "#e4ebf5",
};

export const gradients = {
  hotel: "linear-gradient(135deg,#5b8def,#4a76d4)",
  pesawat: "linear-gradient(135deg,#f5964d,#e8823a)",
  bioskop: "linear-gradient(135deg,#9d7ce0,#8163c9)",
  sidebarActive: "linear-gradient(135deg,#5b8def,#4a76d4)",
  searchTabActive: "linear-gradient(135deg,#5b8def,#4a76d4)",
  submitButton: "linear-gradient(135deg,#ff7600,#f5964d)",
  loginButton: "linear-gradient(135deg,#0b6dff,#0757df)",
  heroOverlay: "linear-gradient(135deg,rgba(58,90,148,0.7) 0%,rgba(47,78,130,0.7) 45%,rgba(38,64,108,0.7) 100%)",
};

export default colors;
