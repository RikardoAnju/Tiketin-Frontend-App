import 'dart:async';
import 'package:flutter/gestures.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import '../../../../core/constants/app_colors.dart';
import '../../../../core/utils/image_utils.dart';
import '../../../../core/utils/toast_utils.dart';
import '../../../../core/routes/app_routes.dart';

enum ForgotPasswordStep { email, otp, reset }

class ForgotPasswordScreen extends StatefulWidget {
  const ForgotPasswordScreen({super.key});

  @override
  State<ForgotPasswordScreen> createState() => _ForgotPasswordScreenState();
}

class _ForgotPasswordScreenState extends State<ForgotPasswordScreen> {
  ForgotPasswordStep _currentStep = ForgotPasswordStep.email;
  
  // Controllers
  final _emailController = TextEditingController();
  final _newPasswordController = TextEditingController();
  final _confirmPasswordController = TextEditingController();
  
  // Form Keys
  final _emailFormKey = GlobalKey<FormState>();
  final _resetFormKey = GlobalKey<FormState>();
  
  // OTP States
  final List<TextEditingController> _otpControllers = List.generate(6, (_) => TextEditingController());
  final List<FocusNode> _otpFocusNodes = List.generate(6, (_) => FocusNode());
  
  // Visibility States
  bool _isNewPasswordObscured = true;
  bool _isConfirmPasswordObscured = true;
  
  // Timer States
  Timer? _timer;
  int _secondsRemaining = 90; // 01:30
  bool _canResend = false;

  @override
  void initState() {
    super.initState();
  }

  @override
  void dispose() {
    _emailController.dispose();
    _newPasswordController.dispose();
    _confirmPasswordController.dispose();
    _timer?.cancel();
    for (var controller in _otpControllers) {
      controller.dispose();
    }
    for (var node in _otpFocusNodes) {
      node.dispose();
    }
    super.dispose();
  }

  void _startTimer() {
    _timer?.cancel();
    setState(() {
      _secondsRemaining = 90;
      _canResend = false;
    });
    _timer = Timer.periodic(const Duration(seconds: 1), (timer) {
      if (_secondsRemaining > 0) {
        setState(() {
          _secondsRemaining--;
        });
      } else {
        setState(() {
          _canResend = true;
        });
        _timer?.cancel();
      }
    });
  }

  String _formatTime(int seconds) {
    final int minutes = seconds ~/ 60;
    final int remainingSeconds = seconds % 60;
    return '${minutes.toString().padLeft(2, '0')}:${remainingSeconds.toString().padLeft(2, '0')}';
  }

  void _handleSendEmail() {
    if (_emailFormKey.currentState!.validate()) {
      setState(() {
        _currentStep = ForgotPasswordStep.otp;
      });
      _startTimer();
    }
  }

  void _handleVerifyOtp() {
    String otp = _otpControllers.map((c) => c.text).join();
    if (otp.length < 6) {
      ToastUtils.showError(context, 'Silakan masukkan 6 digit kode OTP lengkap');
      return;
    }
    // Verify OTP logic
    setState(() {
      _currentStep = ForgotPasswordStep.reset;
    });
  }

  void _handleResetPassword() {
    if (_resetFormKey.currentState!.validate()) {
      ToastUtils.showSuccess(context, 'Kata sandi berhasil diubah!');
      // Navigate to login screen
      Navigator.of(context).pushNamedAndRemoveUntil(AppRoutes.login, (route) => false);
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Container(
        decoration: const BoxDecoration(
          gradient: LinearGradient(
            colors: [AppColors.skyTop, AppColors.skyBottom],
            begin: Alignment.topCenter,
            end: Alignment.bottomCenter,
          ),
        ),
        child: LayoutBuilder(
          builder: (context, constraints) {
            return SingleChildScrollView(
              physics: const ClampingScrollPhysics(),
              child: ConstrainedBox(
                constraints: BoxConstraints(
                  minHeight: constraints.maxHeight,
                ),
                child: IntrinsicHeight(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.stretch,
                    children: [
                      // Area Atas (Background & Logo)
                      SizedBox(
                        height: constraints.maxHeight * 0.35,
                        child: Stack(
                          children: [
                            Positioned(
                              left: 0,
                              right: 0,
                              bottom: 0,
                              child: ImageUtils.bgAtas(),
                            ),
                            Center(
                              child: SafeArea(
                                child: Padding(
                                  padding: const EdgeInsets.only(bottom: 24),
                                  child: ImageUtils.logoTiketin(
                                    height: 100,
                                  ),
                                ),
                              ),
                            ),
                          ],
                        ),
                      ),
                      
                      // Area Formulir (Step Switcher)
                      Expanded(
                        child: Container(
                          decoration: const BoxDecoration(
                            color: Colors.white,
                            borderRadius: BorderRadius.only(
                              topLeft: Radius.circular(28),
                              topRight: Radius.circular(28),
                            ),
                            boxShadow: [
                              BoxShadow(
                                color: Colors.black12,
                                blurRadius: 10,
                                offset: Offset(0, -3),
                              ),
                            ],
                          ),
                          child: AnimatedSwitcher(
                            duration: const Duration(milliseconds: 300),
                            child: _buildCurrentStepWidget(),
                          ),
                        ),
                      ),
                    ],
                  ),
                ),
              ),
            );
          },
        ),
      ),
    );
  }

  Widget _buildCurrentStepWidget() {
    switch (_currentStep) {
      case ForgotPasswordStep.email:
        return _buildEmailStep();
      case ForgotPasswordStep.otp:
        return _buildOtpStep();
      case ForgotPasswordStep.reset:
        return _buildResetStep();
    }
  }

  // STEP 1: Input Email
  Widget _buildEmailStep() {
    return Padding(
      key: const ValueKey('email_step'),
      padding: const EdgeInsets.symmetric(horizontal: 24.0, vertical: 30.0),
      child: Form(
        key: _emailFormKey,
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            const Center(
              child: Text(
                'Lupa Kata Sandi',
                style: TextStyle(
                  fontSize: 22,
                  fontWeight: FontWeight.w800,
                  color: Color(0xFF0F2A66),
                  letterSpacing: -0.5,
                ),
              ),
            ),
            const SizedBox(height: 8),
            const Text(
              'Masukkan email Anda untuk menerima kode OTP',
              textAlign: TextAlign.center,
              style: TextStyle(
                fontSize: 13,
                color: AppColors.textSecondary,
                height: 1.4,
              ),
            ),
            const SizedBox(height: 32),
            
            // Input Email
            TextFormField(
              controller: _emailController,
              keyboardType: TextInputType.emailAddress,
              decoration: InputDecoration(
                hintText: 'Email',
                hintStyle: const TextStyle(color: Color(0xFF9E9E9E), fontSize: 14),
                prefixIcon: const Icon(Icons.mail_outline_rounded, color: Color(0xFF9E9E9E), size: 22),
                filled: true,
                fillColor: const Color(0xFFF9FAFC),
                contentPadding: const EdgeInsets.symmetric(vertical: 16),
                border: OutlineInputBorder(
                  borderRadius: BorderRadius.circular(14),
                  borderSide: const BorderSide(color: Color(0xFFE5E7EB)),
                ),
                enabledBorder: OutlineInputBorder(
                  borderRadius: BorderRadius.circular(14),
                  borderSide: const BorderSide(color: Color(0xFFE5E7EB)),
                ),
                focusedBorder: OutlineInputBorder(
                  borderRadius: BorderRadius.circular(14),
                  borderSide: const BorderSide(color: AppColors.brandBlue, width: 1.5),
                ),
              ),
              validator: (value) {
                if (value == null || value.trim().isEmpty) {
                  return 'Masukkan email Anda';
                }
                final emailRegex = RegExp(r'^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$');
                if (!emailRegex.hasMatch(value)) {
                  return 'Masukkan format email yang valid';
                }
                return null;
              },
            ),
            const SizedBox(height: 24),
            
            // Tombol Kirim Kode OTP
            SizedBox(
              height: 50,
              child: ElevatedButton(
                onPressed: _handleSendEmail,
                style: ElevatedButton.styleFrom(
                  backgroundColor: AppColors.brandBlue,
                  foregroundColor: Colors.white,
                  elevation: 0,
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(14),
                  ),
                ),
                child: const Text(
                  'Kirim Kode OTP',
                  style: TextStyle(
                    fontSize: 15,
                    fontWeight: FontWeight.bold,
                  ),
                ),
              ),
            ),
            const SizedBox(height: 12),
            const Text(
              'Kode OTP akan dikirim ke email/no.hp Anda.',
              textAlign: TextAlign.center,
              style: TextStyle(
                fontSize: 11,
                color: AppColors.textSecondary,
              ),
            ),
            const Spacer(),
            const SizedBox(height: 24),
            
            // Kembali ke Login
            Center(
              child: RichText(
                text: TextSpan(
                  style: const TextStyle(fontSize: 13, color: Color(0xFF9E9E9E)),
                  children: [
                    const TextSpan(text: 'Ingat kata sandi? '),
                    TextSpan(
                      text: 'Masuk',
                      style: const TextStyle(
                        color: AppColors.brandBlue,
                        fontWeight: FontWeight.bold,
                      ),
                      recognizer: TapGestureRecognizer()
                        ..onTap = () {
                          Navigator.of(context).pop();
                        },
                    ),
                  ],
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }

  // STEP 2: Verify OTP
  Widget _buildOtpStep() {
    final String maskedEmail = _emailController.text.isNotEmpty 
      ? '${_emailController.text[0]}****@${_emailController.text.split('@').last}' 
      : 'email Anda';

    return Padding(
      key: const ValueKey('otp_step'),
      padding: const EdgeInsets.symmetric(horizontal: 24.0, vertical: 30.0),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          const Center(
            child: Text(
              'Verifikasi OTP',
              style: TextStyle(
                fontSize: 22,
                fontWeight: FontWeight.w800,
                color: Color(0xFF0F2A66),
                letterSpacing: -0.5,
              ),
            ),
          ),
          const SizedBox(height: 8),
          const Text(
            'Masukkan 6 digit kode OTP yang telah dikirim\nke email Anda',
            textAlign: TextAlign.center,
            style: TextStyle(
              fontSize: 13,
              color: AppColors.textSecondary,
              height: 1.4,
            ),
          ),
          const SizedBox(height: 6),
          Center(
            child: RichText(
              text: TextSpan(
                style: const TextStyle(fontSize: 12, color: AppColors.textSecondary),
                children: [
                  const TextSpan(text: 'Kode dikirim ke: '),
                  TextSpan(
                    text: maskedEmail,
                    style: const TextStyle(color: AppColors.brandBlue, fontWeight: FontWeight.bold),
                  ),
                ],
              ),
            ),
          ),
          const SizedBox(height: 32),
          
          // OTP Input Fields (6 digit)
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: List.generate(6, (index) {
              return SizedBox(
                width: 45,
                height: 50,
                child: TextFormField(
                  controller: _otpControllers[index],
                  focusNode: _otpFocusNodes[index],
                  keyboardType: TextInputType.number,
                  textAlign: TextAlign.center,
                  style: const TextStyle(
                    fontSize: 18,
                    fontWeight: FontWeight.bold,
                    color: Color(0xFF0F2A66),
                  ),
                  inputFormatters: [
                    LengthLimitingTextInputFormatter(1),
                    FilteringTextInputFormatter.digitsOnly,
                  ],
                  decoration: InputDecoration(
                    contentPadding: EdgeInsets.zero,
                    filled: true,
                    fillColor: const Color(0xFFF9FAFC),
                    border: OutlineInputBorder(
                      borderRadius: BorderRadius.circular(10),
                      borderSide: const BorderSide(color: Color(0xFFE5E7EB)),
                    ),
                    enabledBorder: OutlineInputBorder(
                      borderRadius: BorderRadius.circular(10),
                      borderSide: const BorderSide(color: Color(0xFFE5E7EB)),
                    ),
                    focusedBorder: OutlineInputBorder(
                      borderRadius: BorderRadius.circular(10),
                      borderSide: const BorderSide(color: AppColors.brandBlue, width: 1.5),
                    ),
                  ),
                  onChanged: (value) {
                    if (value.isNotEmpty) {
                      if (index < 5) {
                        _otpFocusNodes[index + 1].requestFocus();
                      } else {
                        _otpFocusNodes[index].unfocus();
                      }
                    } else {
                      if (index > 0) {
                        _otpFocusNodes[index - 1].requestFocus();
                      }
                    }
                  },
                ),
              );
            }),
          ),
          const SizedBox(height: 24),
          
          // Timer & Kirim Ulang
          Center(
            child: Column(
              children: [
                Text(
                  _canResend 
                      ? 'Kode kedaluwarsa.' 
                      : 'Kirim ulang kode dalam ${_formatTime(_secondsRemaining)}',
                  style: TextStyle(
                    fontSize: 12,
                    color: _canResend ? AppColors.brandOrange : AppColors.textSecondary,
                    fontWeight: FontWeight.w600,
                  ),
                ),
                const SizedBox(height: 8),
                GestureDetector(
                  onTap: _canResend ? _startTimer : null,
                  child: Text(
                    'Kirim Ulang',
                    style: TextStyle(
                      fontSize: 13,
                      fontWeight: FontWeight.bold,
                      color: _canResend ? AppColors.brandBlue : const Color(0xFFB0C6F5),
                      decoration: TextDecoration.underline,
                    ),
                  ),
                ),
              ],
            ),
          ),
          const SizedBox(height: 32),
          
          // Tombol Verifikasi OTP
          SizedBox(
            height: 50,
            child: ElevatedButton(
              onPressed: _handleVerifyOtp,
              style: ElevatedButton.styleFrom(
                backgroundColor: AppColors.brandBlue,
                foregroundColor: Colors.white,
                elevation: 0,
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(14),
                ),
              ),
              child: const Text(
                'Verifikasi OTP',
                style: TextStyle(
                  fontSize: 15,
                  fontWeight: FontWeight.bold,
                ),
              ),
            ),
          ),
          const Spacer(),
          const SizedBox(height: 24),
          
          // Kembali ke Login
          Center(
            child: RichText(
              text: TextSpan(
                style: const TextStyle(fontSize: 13, color: Color(0xFF9E9E9E)),
                children: [
                  const TextSpan(text: 'Kembali ke '),
                  TextSpan(
                    text: 'Masuk',
                    style: const TextStyle(
                      color: AppColors.brandBlue,
                      fontWeight: FontWeight.bold,
                    ),
                    recognizer: TapGestureRecognizer()
                      ..onTap = () {
                        Navigator.of(context).pop();
                      },
                  ),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }

  // STEP 3: Reset/Change Password
  Widget _buildResetStep() {
    return Padding(
      key: const ValueKey('reset_step'),
      padding: const EdgeInsets.symmetric(horizontal: 24.0, vertical: 30.0),
      child: Form(
        key: _resetFormKey,
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            const Center(
              child: Text(
                'Ubah Kata Sandi',
                style: TextStyle(
                  fontSize: 22,
                  fontWeight: FontWeight.w800,
                  color: Color(0xFF0F2A66),
                  letterSpacing: -0.5,
                ),
              ),
            ),
            const SizedBox(height: 8),
            const Text(
              'Buat kata sandi baru untuk akun Anda',
              textAlign: TextAlign.center,
              style: TextStyle(
                fontSize: 13,
                color: AppColors.textSecondary,
                height: 1.4,
              ),
            ),
            const SizedBox(height: 32),
            
            // Kata Sandi Baru
            TextFormField(
              controller: _newPasswordController,
              obscureText: _isNewPasswordObscured,
              decoration: InputDecoration(
                hintText: 'Kata Sandi Baru',
                hintStyle: const TextStyle(color: Color(0xFF9E9E9E), fontSize: 14),
                prefixIcon: const Icon(Icons.lock_outline_rounded, color: Color(0xFF9E9E9E), size: 22),
                suffixIcon: IconButton(
                  icon: Icon(
                    _isNewPasswordObscured ? Icons.visibility_outlined : Icons.visibility_off_outlined,
                    color: const Color(0xFF9E9E9E),
                    size: 22,
                  ),
                  onPressed: () {
                    setState(() {
                      _isNewPasswordObscured = !_isNewPasswordObscured;
                    });
                  },
                ),
                filled: true,
                fillColor: const Color(0xFFF9FAFC),
                contentPadding: const EdgeInsets.symmetric(vertical: 16),
                border: OutlineInputBorder(
                  borderRadius: BorderRadius.circular(14),
                  borderSide: const BorderSide(color: Color(0xFFE5E7EB)),
                ),
                enabledBorder: OutlineInputBorder(
                  borderRadius: BorderRadius.circular(14),
                  borderSide: const BorderSide(color: Color(0xFFE5E7EB)),
                ),
                focusedBorder: OutlineInputBorder(
                  borderRadius: BorderRadius.circular(14),
                  borderSide: const BorderSide(color: AppColors.brandBlue, width: 1.5),
                ),
              ),
              validator: (value) {
                if (value == null || value.isEmpty) {
                  return 'Masukkan kata sandi baru';
                }
                if (value.length < 8) {
                  return 'Karakter minimal 8 karakter';
                }
                // Check letter and number pattern
                final hasLetter = value.contains(RegExp(r'[a-zA-Z]'));
                final hasDigit = value.contains(RegExp(r'[0-9]'));
                if (!hasLetter || !hasDigit) {
                  return 'Kata sandi harus mengandung huruf dan angka';
                }
                return null;
              },
            ),
            const SizedBox(height: 16),
            
            // Konfirmasi Kata Sandi
            TextFormField(
              controller: _confirmPasswordController,
              obscureText: _isConfirmPasswordObscured,
              decoration: InputDecoration(
                hintText: 'Konfirmasi Kata Sandi',
                hintStyle: const TextStyle(color: Color(0xFF9E9E9E), fontSize: 14),
                prefixIcon: const Icon(Icons.lock_outline_rounded, color: Color(0xFF9E9E9E), size: 22),
                suffixIcon: IconButton(
                  icon: Icon(
                    _isConfirmPasswordObscured ? Icons.visibility_outlined : Icons.visibility_off_outlined,
                    color: const Color(0xFF9E9E9E),
                    size: 22,
                  ),
                  onPressed: () {
                    setState(() {
                      _isConfirmPasswordObscured = !_isConfirmPasswordObscured;
                    });
                  },
                ),
                filled: true,
                fillColor: const Color(0xFFF9FAFC),
                contentPadding: const EdgeInsets.symmetric(vertical: 16),
                border: OutlineInputBorder(
                  borderRadius: BorderRadius.circular(14),
                  borderSide: const BorderSide(color: Color(0xFFE5E7EB)),
                ),
                enabledBorder: OutlineInputBorder(
                  borderRadius: BorderRadius.circular(14),
                  borderSide: const BorderSide(color: Color(0xFFE5E7EB)),
                ),
                focusedBorder: OutlineInputBorder(
                  borderRadius: BorderRadius.circular(14),
                  borderSide: const BorderSide(color: AppColors.brandBlue, width: 1.5),
                ),
              ),
              validator: (value) {
                if (value == null || value.isEmpty) {
                  return 'Konfirmasi kata sandi Anda';
                }
                if (value != _newPasswordController.text) {
                  return 'Kata sandi tidak cocok';
                }
                return null;
              },
            ),
            const SizedBox(height: 12),
            
            // Info Karakter
            Row(
              children: const [
                Icon(Icons.info_outline_rounded, color: AppColors.brandBlue, size: 16),
                SizedBox(width: 6),
                Expanded(
                  child: Text(
                    'Karakter minimal 8 karakter huruf dan angka.',
                    style: TextStyle(
                      fontSize: 11,
                      color: AppColors.brandBlue,
                      fontWeight: FontWeight.w500,
                    ),
                  ),
                ),
              ],
            ),
            const SizedBox(height: 28),
            
            // Tombol Simpan Kata Sandi
            SizedBox(
              height: 50,
              child: ElevatedButton(
                onPressed: _handleResetPassword,
                style: ElevatedButton.styleFrom(
                  backgroundColor: AppColors.brandBlue,
                  foregroundColor: Colors.white,
                  elevation: 0,
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(14),
                  ),
                ),
                child: const Text(
                  'Simpan Kata Sandi',
                  style: TextStyle(
                    fontSize: 15,
                    fontWeight: FontWeight.bold,
                  ),
                ),
              ),
            ),
            const Spacer(),
            const SizedBox(height: 24),
            
            // Kembali ke Login
            Center(
              child: RichText(
                text: TextSpan(
                  style: const TextStyle(fontSize: 13, color: Color(0xFF9E9E9E)),
                  children: [
                    const TextSpan(text: 'Kembali ke '),
                    TextSpan(
                      text: 'Masuk',
                      style: const TextStyle(
                        color: AppColors.brandBlue,
                        fontWeight: FontWeight.bold,
                      ),
                      recognizer: TapGestureRecognizer()
                        ..onTap = () {
                          Navigator.of(context).pop();
                        },
                    ),
                  ],
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
