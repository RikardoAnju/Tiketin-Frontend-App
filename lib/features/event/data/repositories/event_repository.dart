import '../../../../core/constants/api_constants.dart';
import '../../../../core/network/api_client.dart';
import '../models/event_model.dart';

class EventRepository {
  final ApiClient _apiClient;

  EventRepository({ApiClient? apiClient}) : _apiClient = apiClient ?? ApiClient();

  Future<List<EventModel>> getEvents() async {
    final response = await _apiClient.get(ApiConstants.events);
    final List data = response['data'] ?? [];
    return data.map((e) => EventModel.fromJson(e)).toList();
  }

  Future<EventModel> getEventById(String id) async {
    final response = await _apiClient.get('${ApiConstants.events}/$id');
    return EventModel.fromJson(response['data']);
  }
}
