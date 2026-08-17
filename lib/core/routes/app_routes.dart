import 'package:flutter/material.dart';
import '../../features/splash/presentation/screens/splash_screen.dart';
import '../../features/onboarding/presentation/screens/onboarding_screen.dart';
import '../../features/auth/presentation/screens/login_screen.dart';
import '../../features/auth/presentation/screens/forgot_password_screen.dart';
import '../../features/event/presentation/screens/event_detail_screen.dart';
import '../../features/ticket/presentation/screens/my_tickets_screen.dart';
import '../../features/profile/presentation/screens/profile_screen.dart';

class AppRoutes {
  AppRoutes._();

  static const String splash = '/';
  static const String onboarding = '/onboarding';
  static const String login = '/login';
  static const String forgotPassword = '/forgot-password';
  static const String eventDetail = '/event-detail';
  static const String myTickets = '/my-tickets';
  static const String profile = '/profile';

  static Map<String, WidgetBuilder> get routes => {
        splash: (_) => const SplashScreen(),
        onboarding: (_) => const OnboardingScreen(),
        login: (_) => const LoginScreen(),
        forgotPassword: (_) => const ForgotPasswordScreen(),
        eventDetail: (_) => const EventDetailScreen(),
        myTickets: (_) => const MyTicketsScreen(),
        profile: (_) => const ProfileScreen(),
      };
}
