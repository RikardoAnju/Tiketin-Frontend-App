import { BedDouble, Plane, Clapperboard } from "lucide-react";
import { gradients } from "@/utils/colors";
import { posterImages } from "@/utils/images/posters";

export const promos = [
  { icon: BedDouble, gradient: gradients.hotel, title: "Diskon Hotel hingga 40%", text: "Nikmati liburan lebih hemat di ribuan hotel pilihan." },
  { icon: Plane, gradient: gradients.pesawat, title: "Tiket Pesawat Promo", text: "Terbang ke seluruh Indonesia dengan harga spesial." },
  { icon: Clapperboard, gradient: gradients.bioskop, title: "Nonton Jadi Murah", text: "Dapatkan cashback tiket bioskop setiap akhir pekan." },
];

export const cinemaPosters = [
  { title: "#Incantation", src: posterImages.incantation, genre: "Horror", rating: "7.0", price: "Rp35.000" },
  { title: "Annabelle", src: posterImages.annabelle, genre: "Horror", rating: "5.4", price: "Rp40.000" },
  { title: "Avatar: The Way of Water", src: posterImages.avatar, genre: "Adventure", rating: "7.6", price: "Rp50.000" },
  { title: "Harry Potter and the Sorcerer's Stone", src: posterImages.harryPotter, genre: "Fantasy", rating: "7.6", price: "Rp45.000" },
  { title: "Insidious", src: posterImages.insidious, genre: "Horror", rating: "6.8", price: "Rp35.000" },
  { title: "Film Pilihan", src: posterImages.filmPilihan, genre: "Now Playing", rating: "8.1", price: "Rp40.000" },
  { title: "Film Terbaru", src: posterImages.filmTerbaru, genre: "Now Playing", rating: "7.8", price: "Rp40.000" },
  { title: "Coming Soon", src: posterImages.comingSoon, genre: "Coming Soon", rating: "-", price: "Segera hadir" },
  { title: "Special Screening", src: posterImages.specialScreening, genre: "Special", rating: "8.0", price: "Rp55.000" },
  { title: "Weekend Movie", src: posterImages.weekendMovie, genre: "Weekend", rating: "7.4", price: "Rp45.000" },
];
