import 'models/event_model.dart';

/// Temporary local data used while the backend isn't running yet.
/// Once the API is available, [EventProvider] will use real data
/// automatically — this is only a fallback.
final List<EventModel> dummyEvents = [
  EventModel(
    id: '1',
    title: 'Konser Musik Jazz Malam',
    description: 'Nikmati alunan jazz dari musisi lokal terbaik.',
    location: 'Jakarta International Expo',
    date: DateTime.now().add(const Duration(days: 7)),
    price: 150000,
    imageUrl: '',
  ),
  EventModel(
    id: '2',
    title: 'Festival Kuliner Nusantara',
    description: 'Jelajahi ratusan kuliner khas daerah di satu tempat.',
    location: 'Lapangan Banteng, Jakarta',
    date: DateTime.now().add(const Duration(days: 14)),
    price: 25000,
    imageUrl: '',
  ),
  EventModel(
    id: '3',
    title: 'Pameran Startup Tech 2026',
    description: 'Pameran teknologi dan inovasi startup terbaru.',
    location: 'ICE BSD, Tangerang',
    date: DateTime.now().add(const Duration(days: 21)),
    price: 75000,
    imageUrl: '',
  ),
  EventModel(
    id: '4',
    title: 'Stand Up Comedy Night',
    description: 'Malam penuh tawa bersama komika ternama.',
    location: 'Balai Sarbini, Jakarta',
    date: DateTime.now().add(const Duration(days: 3)),
    price: 100000,
    imageUrl: '',
  ),
];
