class TicketModel {
  final String id;
  final String eventId;
  final String userId;
  final String status;
  final DateTime purchasedAt;

  TicketModel({
    required this.id,
    required this.eventId,
    required this.userId,
    required this.status,
    required this.purchasedAt,
  });

  factory TicketModel.fromJson(Map<String, dynamic> json) {
    return TicketModel(
      id: json['id'].toString(),
      eventId: json['event_id'].toString(),
      userId: json['user_id'].toString(),
      status: json['status'] ?? '',
      purchasedAt: DateTime.parse(json['purchased_at']),
    );
  }
}
