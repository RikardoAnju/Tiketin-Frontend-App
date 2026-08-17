import 'package:flutter/material.dart';
import '../../../../core/utils/image_utils.dart';

class OnboardingHeader extends StatelessWidget {
  final double logoHeight;

  const OnboardingHeader({
    super.key,
    this.logoHeight = 84,
  });

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 8),
      child: Center(
        child: ImageUtils.logoTiketin(
          height: logoHeight,
        ),
      ),
    );
  }
}

