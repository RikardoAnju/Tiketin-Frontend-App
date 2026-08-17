import 'package:flutter/material.dart';
import '../../../../core/constants/app_colors.dart';
import '../../../../core/utils/image_utils.dart';

class FeatureIconItem extends StatelessWidget {
  final String image;
  final String label;

  const FeatureIconItem({super.key, required this.image, required this.label});

  @override
  Widget build(BuildContext context) {
    return Column(
      mainAxisSize: MainAxisSize.min,
      children: [
        ImageUtils.asset(image, width: 40, height: 40, fit: BoxFit.contain),
        const SizedBox(height: 6),
        Text(
          label,
          style: const TextStyle(fontSize: 11, color: AppColors.textSecondary, fontWeight: FontWeight.w600),
        ),
      ],
    );
  }
}
