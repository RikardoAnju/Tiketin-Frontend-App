const posterBase = "/images/posters";

export const posterImages = {
  incantation: `${posterBase}/incantation.webp`,
  annabelle: `${posterBase}/annabelle.webp`,
  avatar: `${posterBase}/avatar-the-way-of-water.webp`,
  harryPotter: `${posterBase}/harry-potter-and-the-sorcerers-stone-2001.webp`,
  insidious: `${posterBase}/insidious.webp`,
  filmPilihan: `${posterBase}/download.webp`,
  filmTerbaru: `${posterBase}/download-1.webp`,
  comingSoon: `${posterBase}/download-2.webp`,
  specialScreening: `${posterBase}/download-3.webp`,
  weekendMovie: `${posterBase}/download-4.webp`,
} as const;

export const trendingMovies = [
  { slug: "incantation", title: "#Incantation", src: posterImages.incantation, genre: "Horor", rating: "7.0", duration: "1j 46m", director: "Rizal Mantovani", synopsis: "Seorang perempuan muda terseret ke dalam rahasia keluarga yang kelam setelah menemukan ritual kuno." },
  { slug: "avatar-the-way-of-water", title: "Avatar: The Way of Water", src: posterImages.avatar, genre: "Adventure", rating: "7.6", duration: "3j 12m", director: "James Cameron", synopsis: "Keluarga Sully mencari perlindungan di dunia perairan Pandora saat ancaman lama kembali." },
  { slug: "harry-potter", title: "Harry Potter", src: posterImages.harryPotter, genre: "Fantasy", rating: "7.6", duration: "2j 32m", director: "Chris Columbus", synopsis: "Harry Potter menemukan bahwa dirinya adalah penyihir dan memulai petualangan pertamanya di Hogwarts." },
  { slug: "insidious", title: "Insidious", src: posterImages.insidious, genre: "Horor", rating: "6.8", duration: "1j 43m", director: "James Wan", synopsis: "Sebuah keluarga berusaha menyelamatkan putra mereka yang terjebak di alam gelap." },
] as const;

export const filmDetails = Object.fromEntries(
  trendingMovies.map((movie) => [movie.slug, movie]),
) as Record<string, (typeof trendingMovies)[number]>;
