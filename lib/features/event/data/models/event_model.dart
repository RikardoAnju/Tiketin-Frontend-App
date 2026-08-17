class EventModel {
  final String id;
  final String title;
  final String description;
  final String location;
  final DateTime date;
  final double price;
  final String imageUrl;

  EventModel({
    required this.id,
    required this.title,
    required this.description,
    required this.location,
    required this.date,
    required this.price,
    required this.imageUrl,
  });

  factory EventModel.fromJson(Map<String, dynamic> json) {
    return EventModel(
      id: json['id'].toString(),
      title: json['title'] ?? '',
      description: json['description'] ?? '',
      location: json['location'] ?? '',
      date: DateTime.parse(json['date']),
      price: (json['price'] as num).toDouble(),
      imageUrl: json['image_url'] ?? '',
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'title': title,
      'description': description,
      'location': location,
      'date': date.toIso8601String(),
      'price': price,
      'image_url': imageUrl,
    };
  }
}
