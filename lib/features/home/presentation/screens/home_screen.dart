import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../../../../core/constants/app_images.dart';
import '../../../event/presentation/providers/event_provider.dart';

class HomeScreen extends StatefulWidget {
  const HomeScreen({super.key});

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance.addPostFrameCallback((_) {
      context.read<EventProvider>().fetchEvents();
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Tiketin')),
      body: Consumer<EventProvider>(
        builder: (context, eventProvider, _) {
          if (eventProvider.isLoading) {
            return const Center(child: CircularProgressIndicator());
          }

          if (eventProvider.errorMessage != null) {
            return Center(child: Text(eventProvider.errorMessage!));
          }

          if (eventProvider.events.isEmpty) {
            return const Center(child: Text('No events yet'));
          }

          return ListView.builder(
            padding: const EdgeInsets.all(16),
            itemCount: eventProvider.events.length,
            itemBuilder: (context, index) {
              final event = eventProvider.events[index];
              return Card(
                clipBehavior: Clip.antiAlias,
                margin: const EdgeInsets.only(bottom: 12),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    AspectRatio(
                      aspectRatio: 16 / 9,
                      child: Image.network(
                        event.imageUrl,
                        fit: BoxFit.cover,
                        errorBuilder: (context, error, stackTrace) => Image.asset(
                          AppImages.eventPlaceholder,
                          fit: BoxFit.cover,
                        ),
                      ),
                    ),
                    Padding(
                      padding: const EdgeInsets.all(12),
                      child: Text(event.title, style: Theme.of(context).textTheme.titleMedium),
                    ),
                  ],
                ),
              );
            },
          );
        },
      ),
    );
  }
}
