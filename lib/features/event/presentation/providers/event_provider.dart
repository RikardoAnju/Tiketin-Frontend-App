import 'package:flutter/foundation.dart';
import '../../data/models/event_model.dart';
import '../../data/repositories/event_repository.dart';

class EventProvider extends ChangeNotifier {
  final EventRepository _repository;

  EventProvider({EventRepository? repository}) : _repository = repository ?? EventRepository();

  List<EventModel> _events = [];
  EventModel? _selectedEvent;
  bool _isLoading = false;
  String? _errorMessage;

  List<EventModel> get events => _events;
  EventModel? get selectedEvent => _selectedEvent;
  bool get isLoading => _isLoading;
  String? get errorMessage => _errorMessage;

  Future<void> fetchEvents() async {
    _setLoading(true);
    try {
      _events = await _repository.getEvents();
      _errorMessage = null;
    } catch (e) {
      _errorMessage = e.toString();
    } finally {
      _setLoading(false);
    }
  }

  Future<void> fetchEventById(String id) async {
    _setLoading(true);
    try {
      _selectedEvent = await _repository.getEventById(id);
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
