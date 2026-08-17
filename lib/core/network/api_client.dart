import 'dart:convert';
import 'package:http/http.dart' as http;
import '../constants/api_constants.dart';

class ApiClient {
  final http.Client _client;

  ApiClient({http.Client? client}) : _client = client ?? http.Client();

  Future<dynamic> get(String path, {Map<String, String>? headers}) async {
    final response = await _client.get(
      Uri.parse('${ApiConstants.baseUrl}$path'),
      headers: headers,
    );
    return _handleResponse(response);
  }

  Future<dynamic> post(String path, {Object? body, Map<String, String>? headers}) async {
    final response = await _client.post(
      Uri.parse('${ApiConstants.baseUrl}$path'),
      headers: {'Content-Type': 'application/json', ...?headers},
      body: jsonEncode(body),
    );
    return _handleResponse(response);
  }

  dynamic _handleResponse(http.Response response) {
    if (response.statusCode >= 200 && response.statusCode < 300) {
      if (response.body.isEmpty) return null;
      return jsonDecode(response.body);
    }
    throw Exception('Request failed (${response.statusCode}): ${response.body}');
  }
}
