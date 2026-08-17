import 'dart:async';
import 'package:flutter/material.dart';

enum ToastType { success, error, info, warning }

class ToastUtils {
  ToastUtils._();

  static void showSuccess(BuildContext context, String message) {
    _showToast(context, message, ToastType.success);
  }

  static void showError(BuildContext context, String message) {
    _showToast(context, message, ToastType.error);
  }

  static void showInfo(BuildContext context, String message) {
    _showToast(context, message, ToastType.info);
  }

  static void showWarning(BuildContext context, String message) {
    _showToast(context, message, ToastType.warning);
  }

  static void _showToast(BuildContext context, String message, ToastType type) {
    final overlayState = Overlay.of(context);
    late OverlayEntry overlayEntry;

    overlayEntry = OverlayEntry(
      builder: (context) => _ToastWidget(
        message: message,
        type: type,
        onDismiss: () {
          overlayEntry.remove();
        },
      ),
    );

    overlayState.insert(overlayEntry);
  }
}

class _ToastWidget extends StatefulWidget {
  final String message;
  final ToastType type;
  final VoidCallback onDismiss;

  const _ToastWidget({
    required this.message,
    required this.type,
    required this.onDismiss,
  });

  @override
  State<_ToastWidget> createState() => _ToastWidgetState();
}

class _ToastWidgetState extends State<_ToastWidget> with SingleTickerProviderStateMixin {
  late final AnimationController _controller;
  late final Animation<double> _fadeAnimation;
  late final Animation<Offset> _slideAnimation;
  Timer? _dismissTimer;

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 400),
    );

    _fadeAnimation = CurvedAnimation(parent: _controller, curve: Curves.easeIn);
    _slideAnimation = Tween<Offset>(
      begin: const Offset(0, -1.2),
      end: Offset.zero,
    ).animate(CurvedAnimation(parent: _controller, curve: Curves.easeOutBack));

    _controller.forward();

    _dismissTimer = Timer(const Duration(seconds: 3), () {
      _dismiss();
    });
  }

  void _dismiss() {
    if (mounted) {
      _controller.reverse().then((_) {
        widget.onDismiss();
      });
    }
  }

  @override
  void dispose() {
    _dismissTimer?.cancel();
    _controller.dispose();
    super.dispose();
  }

  Color _getBackgroundColor() {
    switch (widget.type) {
      case ToastType.success:
        return const Color(0xFFE8F5E9);
      case ToastType.error:
        return const Color(0xFFFFEBEE);
      case ToastType.info:
        return const Color(0xFFE3F2FD);
      case ToastType.warning:
        return const Color(0xFFFFF8E1);
    }
  }

  Color _getBorderColor() {
    switch (widget.type) {
      case ToastType.success:
        return const Color(0xFFA5D6A7);
      case ToastType.error:
        return const Color(0xFFFFCDD2);
      case ToastType.info:
        return const Color(0xFFBBDEFB);
      case ToastType.warning:
        return const Color(0xFFFFECB3);
    }
  }

  Color _getTextColor() {
    switch (widget.type) {
      case ToastType.success:
        return const Color(0xFF1B5E20);
      case ToastType.error:
        return const Color(0xFFB71C1C);
      case ToastType.info:
        return const Color(0xFF0D47A1);
      case ToastType.warning:
        return const Color(0xFFE65100);
    }
  }

  IconData _getIcon() {
    switch (widget.type) {
      case ToastType.success:
        return Icons.check_circle_rounded;
      case ToastType.error:
        return Icons.error_rounded;
      case ToastType.info:
        return Icons.info_rounded;
      case ToastType.warning:
        return Icons.warning_rounded;
    }
  }

  @override
  Widget build(BuildContext context) {
    final double topPadding = MediaQuery.of(context).padding.top + 12;
    
    return Positioned(
      top: topPadding,
      left: 16,
      right: 16,
      child: Material(
        color: Colors.transparent,
        child: SlideTransition(
          position: _slideAnimation,
          child: FadeTransition(
            opacity: _fadeAnimation,
            child: GestureDetector(
              onVerticalDragUpdate: (details) {
                if (details.primaryDelta! < -5) {
                  _dismiss();
                }
              },
              child: Container(
                padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
                decoration: BoxDecoration(
                  color: _getBackgroundColor(),
                  borderRadius: BorderRadius.circular(16),
                  border: Border.all(color: _getBorderColor(), width: 1.5),
                  boxShadow: [
                    BoxShadow(
                      color: Colors.black.withValues(alpha: 0.06),
                      blurRadius: 12,
                      offset: const Offset(0, 4),
                    ),
                  ],
                ),
                child: Row(
                  children: [
                    Icon(
                      _getIcon(),
                      color: _getTextColor(),
                      size: 24,
                    ),
                    const SizedBox(width: 12),
                    Expanded(
                      child: Text(
                        widget.message,
                        style: TextStyle(
                          color: _getTextColor(),
                          fontSize: 14,
                          fontWeight: FontWeight.w600,
                          height: 1.3,
                        ),
                      ),
                    ),
                    GestureDetector(
                      onTap: _dismiss,
                      child: Icon(
                        Icons.close_rounded,
                        color: _getTextColor().withValues(alpha: 0.6),
                        size: 18,
                      ),
                    ),
                  ],
                ),
              ),
            ),
          ),
        ),
      ),
    );
  }
}
