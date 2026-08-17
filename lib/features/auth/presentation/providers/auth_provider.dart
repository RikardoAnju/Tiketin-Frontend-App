import 'package:flutter/foundation.dart';

enum AuthStatus { unknown, authenticated, unauthenticated }

class AuthProvider extends ChangeNotifier {
  AuthStatus _status = AuthStatus.unknown;
  String? _token;
  bool _isLoading = false;
  String? _errorMessage;

  AuthStatus get status => _status;
  String? get token => _token;
  bool get isLoading => _isLoading;
  String? get errorMessage => _errorMessage;
  bool get isAuthenticated => _status == AuthStatus.authenticated;

  Future<void> login(String email, String password) async {
    _setLoading(true);
    try {
      // TODO: call AuthRepository.login and store the returned token
      _token = 'dummy-token';
      _status = AuthStatus.authenticated;
      _errorMessage = null;
    } catch (e) {
      _errorMessage = e.toString();
      _status = AuthStatus.unauthenticated;
    } finally {
      _setLoading(false);
    }
  }

  Future<void> register(String name, String email, String password) async {
    _setLoading(true);
    try {
      // TODO: call AuthRepository.register and store the returned token
      _token = 'dummy-token';
      _status = AuthStatus.authenticated;
      _errorMessage = null;
    } catch (e) {
      _errorMessage = e.toString();
      _status = AuthStatus.unauthenticated;
    } finally {
      _setLoading(false);
    }
  }

  void logout() {
    _token = null;
    _status = AuthStatus.unauthenticated;
    notifyListeners();
  }

  void _setLoading(bool value) {
    _isLoading = value;
    notifyListeners();
  }
}
