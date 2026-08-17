import 'package:flutter/foundation.dart';
import '../../data/models/ticket_model.dart';
import '../../data/repositories/ticket_repository.dart';

class TicketProvider extends ChangeNotifier {
  final TicketRepository _repository;

  TicketProvider({TicketRepository? repository}) : _repository = repository ?? TicketRepository();

  List<TicketModel> _tickets = [];
  bool _isLoading = false;
  String? _errorMessage;

  List<TicketModel> get tickets => _tickets;
  bool get isLoading => _isLoading;
  String? get errorMessage => _errorMessage;

  Future<void> fetchMyTickets() async {
    _setLoading(true);
    try {
      _tickets = await _repository.getMyTickets();
      _errorMessage = null;
    } catch (e) {
      _errorMessage = e.toString();
    } finally {
      _setLoading(false);
    }
  }

  void _setLoading(bool value) {
    _isLoading = value;
    notifyListeners();
  }
}
