import 'package:flutter/material.dart';
import '../constants/app_images.dart';

class ImageUtils {
  ImageUtils._();

  static Widget asset(
    String path, {
    double? width,
    double? height,
    BoxFit? fit,
    Alignment alignment = Alignment.center,
  }) {
    return Image.asset(
      path,
      width: width,
      height: height,
      fit: fit,
      alignment: alignment,
    );
  }

  /// Logo Tiketin
  static Widget logoTiketin({
    double? width,
    double? height,
    BoxFit fit = BoxFit.contain,
  }) {
    return Image.asset(
      AppImages.logoTiketin,
      width: width,
      height: height,
      fit: fit,
    );
  }

  /// Logo App Icon
  static Widget logoAppIcon({
    double? width,
    double? height,
    BoxFit fit = BoxFit.contain,
  }) {
    return Image.asset(
      AppImages.logoAppIcon,
      width: width,
      height: height,
      fit: fit,
    );
  }

  /// Logo Google
  static Widget logoGoogle({
    double? width,
    double? height = 22,
    BoxFit fit = BoxFit.contain,
  }) {
    return Image.asset(
      AppImages.logoGoogle,
      width: width,
      height: height,
      fit: fit,
    );
  }

 
  static Widget bgDefault({
    BoxFit fit = BoxFit.cover,
  }) {
    return Image.asset(
      AppImages.bgDefault,
      fit: fit,
    );
  }

  static Widget bgAtas({
    BoxFit fit = BoxFit.fitWidth,
    Alignment alignment = Alignment.bottomCenter,
  }) {
    return Image.asset(
      AppImages.bgAtas,
      fit: fit,
      alignment: alignment,
    );
  }
}
