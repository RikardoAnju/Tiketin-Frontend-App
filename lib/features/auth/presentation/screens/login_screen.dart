import 'package:flutter/gestures.dart';
import 'package:flutter/material.dart';
import '../../../../core/constants/app_colors.dart';
import '../../../../core/routes/app_routes.dart';
import '../../../../core/utils/image_utils.dart';
import '../../../../core/utils/toast_utils.dart';

class LoginScreen extends StatefulWidget {
  const LoginScreen({super.key});

  @override
  State<LoginScreen> createState() => _LoginScreenState();
}

class _LoginScreenState extends State<LoginScreen> {
  final _formKey = GlobalKey<FormState>();
  final _emailController = TextEditingController();
  final _passwordController = TextEditingController();
  bool _isObscured = true;

  @override
  void dispose() {
    _emailController.dispose();
    _passwordController.dispose();
    super.dispose();
  }

  void _handleLogin() {
    if (_formKey.currentState!.validate()) {
      // Logic login
      ToastUtils.showSuccess(context, 'Berhasil Masuk!');
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
                            // Background kota/kendaraan (bg_atas.png) sejajar di bagian bawah area atas
                            Positioned(
                              left: 0,
                              right: 0,
                              bottom: 0,
                              child: ImageUtils.bgAtas(),
                            ),
                            // Logo Tiketin di tengah
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
                      
                      // Area Formulir (White Panel)
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
                          child: Padding(
                            padding: const EdgeInsets.symmetric(horizontal: 24.0, vertical: 30.0),
                            child: Form(
                              key: _formKey,
                              child: Column(
                                crossAxisAlignment: CrossAxisAlignment.stretch,
                                children: [
                                  // Judul Masuk
                                  Center(
                                    child: RichText(
                                      text: const TextSpan(
                                        style: TextStyle(
                                          fontSize: 24,
                                          fontWeight: FontWeight.w800,
                                          letterSpacing: -0.5,
                                        ),
                                        children: [
                                          TextSpan(
                                            text: 'Masuk ke TIKET',
                                            style: TextStyle(color: Color(0xFF0F2A66)),
                                          ),
                                          TextSpan(
                                            text: 'IN',
                                            style: TextStyle(color: AppColors.brandOrange),
                                          ),
                                        ],
                                      ),
                                    ),
                                  ),
                                  const SizedBox(height: 8),
                                  // Subtitel
                                  const Text(
                                    'Yuk, lanjutkan perjalananmu\ndan temukan pengalaman terbaik.',
                                    textAlign: TextAlign.center,
                                    style: TextStyle(
                                      fontSize: 13,
                                      color: AppColors.textSecondary,
                                      height: 1.4,
                                    ),
                                  ),
                                  const SizedBox(height: 24),
                                  
                                  // Input Email atau Nomor HP
                                  TextFormField(
                                    controller: _emailController,
                                    keyboardType: TextInputType.emailAddress,
                                    decoration: InputDecoration(
                                      hintText: 'Email atau Nomor HP',
                                      hintStyle: const TextStyle(color: Color(0xFF9E9E9E), fontSize: 14),
                                      prefixIcon: const Icon(Icons.person_outline_rounded, color: Color(0xFF9E9E9E), size: 22),
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
                                        return 'Masukkan email atau nomor HP Anda';
                                      }
                                      return null;
                                    },
                                  ),
                                  const SizedBox(height: 16),
                                  
                                  // Input Password
                                  TextFormField(
                                    controller: _passwordController,
                                    obscureText: _isObscured,
                                    decoration: InputDecoration(
                                      hintText: 'Password',
                                      hintStyle: const TextStyle(color: Color(0xFF9E9E9E), fontSize: 14),
                                      prefixIcon: const Icon(Icons.lock_outline_rounded, color: Color(0xFF9E9E9E), size: 22),
                                      suffixIcon: IconButton(
                                        icon: Icon(
                                          _isObscured ? Icons.visibility_outlined : Icons.visibility_off_outlined,
                                          color: const Color(0xFF9E9E9E),
                                          size: 22,
                                        ),
                                        onPressed: () {
                                          setState(() {
                                            _isObscured = !_isObscured;
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
                                        return 'Masukkan password Anda';
                                      }
                                      return null;
                                    },
                                  ),
                                  const SizedBox(height: 10),
                                  
                                  // Lupa Password
                                  Align(
                                    alignment: Alignment.centerRight,
                                    child: GestureDetector(
                                      onTap: () {
                                        Navigator.of(context).pushNamed(AppRoutes.forgotPassword);
                                      },
                                      child: const Text(
                                        'Lupa Password?',
                                        style: TextStyle(
                                          color: AppColors.brandBlue,
                                          fontWeight: FontWeight.w600,
                                          fontSize: 13,
                                        ),
                                      ),
                                    ),
                                  ),
                                  const SizedBox(height: 24),
                                  
                                  // Tombol Masuk
                                  SizedBox(
                                    height: 50,
                                    child: ElevatedButton(
                                      onPressed: _handleLogin,
                                      style: ElevatedButton.styleFrom(
                                        backgroundColor: AppColors.brandBlue,
                                        foregroundColor: Colors.white,
                                        elevation: 0,
                                        shape: RoundedRectangleBorder(
                                          borderRadius: BorderRadius.circular(14),
                                        ),
                                      ),
                                      child: const Text(
                                        'Masuk',
                                        style: TextStyle(
                                          fontSize: 15,
                                          fontWeight: FontWeight.bold,
                                        ),
                                      ),
                                    ),
                                  ),
                                  const SizedBox(height: 12),
                                  
                                  // Tombol Buat Akun
                                  SizedBox(
                                    height: 50,
                                    child: OutlinedButton(
                                      onPressed: () {
                                        // Rute pendaftaran
                                      },
                                      style: OutlinedButton.styleFrom(
                                        foregroundColor: AppColors.brandBlue,
                                        side: const BorderSide(color: Color(0xFFD2E3FC), width: 1.5),
                                        shape: RoundedRectangleBorder(
                                          borderRadius: BorderRadius.circular(14),
                                        ),
                                      ),
                                      child: const Text(
                                        'Buat Akun',
                                        style: TextStyle(
                                          fontSize: 15,
                                          fontWeight: FontWeight.bold,
                                        ),
                                      ),
                                    ),
                                  ),
                                  const SizedBox(height: 20),
                                  
                                  // Divider ATAU
                                  Row(
                                    children: const [
                                      Expanded(child: Divider(color: Color(0xFFE5E7EB), thickness: 1)),
                                      Padding(
                                        padding: EdgeInsets.symmetric(horizontal: 16.0),
                                        child: Text(
                                          'ATAU',
                                          style: TextStyle(
                                            color: Color(0xFF9E9E9E),
                                            fontSize: 11,
                                            fontWeight: FontWeight.bold,
                                          ),
                                        ),
                                      ),
                                      Expanded(child: Divider(color: Color(0xFFE5E7EB), thickness: 1)),
                                    ],
                                  ),
                                  const SizedBox(height: 20),
                                  
                                  // Tombol Masuk dengan Google
                                  SizedBox(
                                    height: 50,
                                    child: OutlinedButton(
                                      onPressed: () {
                                        // Logic login google
                                      },
                                      style: OutlinedButton.styleFrom(
                                        foregroundColor: AppColors.textPrimary,
                                        backgroundColor: const Color(0xFFF9FAFC),
                                        side: const BorderSide(color: Color(0xFFE5E7EB)),
                                        shape: RoundedRectangleBorder(
                                          borderRadius: BorderRadius.circular(14),
                                        ),
                                      ),
                                      child: Row(
                                        mainAxisAlignment: MainAxisAlignment.center,
                                        children: [
                                          ImageUtils.logoGoogle(),
                                          const SizedBox(width: 12),
                                          const Text(
                                            'Masuk dengan Google',
                                            style: TextStyle(
                                              fontSize: 14,
                                              fontWeight: FontWeight.w600,
                                            ),
                                          ),
                                        ],
                                      ),
                                    ),
                                  ),
                                  const SizedBox(height: 24),
                                  
                                  // Syarat & Ketentuan
                                  Center(
                                    child: RichText(
                                      textAlign: TextAlign.center,
                                      text: TextSpan(
                                        style: const TextStyle(
                                          fontSize: 11,
                                          color: Color(0xFF9E9E9E),
                                          height: 1.5,
                                        ),
                                        children: [
                                          const TextSpan(text: 'Dengan masuk atau membuat akun, kamu menyetujui '),
                                          TextSpan(
                                            text: 'Syarat & Ketentuan',
                                            style: const TextStyle(
                                              color: AppColors.brandBlue,
                                              fontWeight: FontWeight.w600,
                                            ),
                                            recognizer: TapGestureRecognizer()..onTap = () {
                                              // Navigasi Syarat & Ketentuan
                                            },
                                          ),
                                          const TextSpan(text: ' dan '),
                                          TextSpan(
                                            text: 'Kebijakan Privasi',
                                            style: const TextStyle(
                                              color: AppColors.brandBlue,
                                              fontWeight: FontWeight.w600,
                                            ),
                                            recognizer: TapGestureRecognizer()..onTap = () {
                                              // Navigasi Kebijakan Privasi
                                            },
                                          ),
                                          const TextSpan(text: '.'),
                                        ],
                                      ),
                                    ),
                                  ),
                                ],
                              ),
                            ),
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
}
