import 'dart:io' show Platform;
import 'package:flutter/foundation.dart' show kIsWeb;

class ApiConstants {
  ApiConstants._();

  /// Backend host reachable from wherever the app is running:
  /// - Web / desktop: the machine's own localhost
  /// - Android emulator: 10.0.2.2 maps to the host machine's localhost
  /// - iOS simulator: localhost works directly
  static String get _host {
    if (kIsWeb) return 'localhost';
    if (Platform.isAndroid) return '10.0.2.2';
    return 'localhost';
  }

  static String get baseUrl => 'http://$_host:8080/api/v1';

  // Auth
  static const String login = '/auth/login';
  static const String register = '/auth/register';

  // Events
  static const String events = '/events';

  // Tickets
  static const String tickets = '/tickets';
}
