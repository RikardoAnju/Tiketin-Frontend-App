import 'package:flutter/material.dart';
import '../../features/home/presentation/screens/home_screen.dart';
import '../../features/auth/presentation/screens/login_screen.dart';
import '../../features/event/presentation/screens/event_detail_screen.dart';
import '../../features/ticket/presentation/screens/my_tickets_screen.dart';
import '../../features/profile/presentation/screens/profile_screen.dart';

class AppRoutes {
  AppRoutes._();

  static const String home = '/';
  static const String login = '/login';
  static const String eventDetail = '/event-detail';
  static const String myTickets = '/my-tickets';
  static const String profile = '/profile';

  static Map<String, WidgetBuilder> get routes => {
        home: (_) => const HomeScreen(),
        login: (_) => const LoginScreen(),
        eventDetail: (_) => const EventDetailScreen(),
        myTickets: (_) => const MyTicketsScreen(),
        profile: (_) => const ProfileScreen(),
      };
}
