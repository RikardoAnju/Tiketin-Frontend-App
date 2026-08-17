import '../../core/constants/api_constants.dart';
import '../../core/network/api_client.dart';
import '../models/ticket_model.dart';

class TicketRepository {
  final ApiClient _apiClient;

  TicketRepository({ApiClient? apiClient}) : _apiClient = apiClient ?? ApiClient();

  Future<List<TicketModel>> getMyTickets() async {
    final response = await _apiClient.get(ApiConstants.tickets);
    final List data = response['data'] ?? [];
    return data.map((e) => TicketModel.fromJson(e)).toList();
  }
}
