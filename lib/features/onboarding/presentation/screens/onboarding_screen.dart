import 'package:flutter/material.dart';
import '../../../../core/constants/app_colors.dart';
import '../../../../core/constants/app_images.dart';
import '../../../../core/routes/app_routes.dart';
import '../../../../core/utils/image_utils.dart';
import '../widgets/feature_detail_card.dart';
import '../widgets/feature_icon_item.dart';
import '../widgets/onboarding_actions.dart';
import '../widgets/onboarding_header.dart';

class _TitleSegment {
  final String text;
  final Color? color;

  const _TitleSegment(this.text, [this.color]);
}

class _FeatureDetail {
  final IconData icon;
  final String title;
  final String description;

  const _FeatureDetail(this.icon, this.title, this.description);
}

class _OnboardingPageData {
  final String image;
  final List<_TitleSegment> title;
  final String description;
  final String primaryLabel;
  final List<(String, String)>? categories;
  final List<_FeatureDetail>? features;

  const _OnboardingPageData({
    required this.image,
    required this.title,
    required this.description,
    required this.primaryLabel,
    this.categories,
    this.features,
  });
}

class OnboardingScreen extends StatefulWidget {
  const OnboardingScreen({super.key});

  @override
  State<OnboardingScreen> createState() => _OnboardingScreenState();
}

class _OnboardingScreenState extends State<OnboardingScreen> {
  final PageController _controller = PageController();
  int _currentPage = 0;

  static const List<_OnboardingPageData> _pages = [
    _OnboardingPageData(
      image: AppImages.illustrationPlaceholder,
      title: [
        _TitleSegment('Semua Tiket dalam '),
        _TitleSegment('Satu Aplikasi', AppColors.brandBlue),
      ],
      description:
          'Pesawat, kereta, bus, sampai kapal. Semua bisa kamu pesan mudah lewat satu aplikasi, tanpa ribet.',
      primaryLabel: 'Selanjutnya',
      categories: [
        (AppImages.icFlight, 'Pesawat'),
        (AppImages.icTrain, 'Kereta'),
        (AppImages.icBus, 'Bus'),
        (AppImages.icShip, 'Kapal'),
        (AppImages.icCelebration, 'Event'),
        (AppImages.icCategory, 'Wisata'),
      ],
    ),
    _OnboardingPageData(
      image: AppImages.searchMockupPlaceholder,
      title: [
        _TitleSegment('Pesan '),
        _TitleSegment('Lebih ', AppColors.brandOrange),
        _TitleSegment('Mudah & Cepat', AppColors.brandBlue),
      ],
      description:
          'Cari perjalanan, pilih tiket, dan selesaikan pembayaran dengan langkah yang praktis di aplikasi TIKETIN.',
      primaryLabel: 'Selanjutnya',
      features: [
        _FeatureDetail(Icons.search_rounded, 'Cari Jadwal', 'Temukan perjalanan sesuai kebutuhan'),
        _FeatureDetail(Icons.confirmation_num_rounded, 'Pilih Tiket', 'Bandingkan & pilih tiket terbaik'),
        _FeatureDetail(Icons.payments_rounded, 'Bayar Praktis', 'Pembayaran aman & tersertifikasi'),
      ],
    ),
    _OnboardingPageData(
      image: AppImages.ticketMockupPlaceholder,
      title: [
        _TitleSegment('Tiket Kamu '),
        _TitleSegment('Selalu Siap', AppColors.brandBlue),
      ],
      description:
          'Semua tiket yang sudah kamu pesan tersimpan rapi di TIKETIN dan siap digunakan kapan saja.',
      primaryLabel: 'Mulai Sekarang',
    ),
  ];

  void _onPrimaryPressed() {
    final isLastPage = _currentPage == _pages.length - 1;
    if (!isLastPage) {
      _controller.nextPage(duration: const Duration(milliseconds: 300), curve: Curves.easeOut);
    } else {
      _goToLogin();
    }
  }

  void _goToLogin() {
    Navigator.of(context).pushNamedAndRemoveUntil(AppRoutes.login, (route) => false);
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final page = _pages[_currentPage];

    return Scaffold(
      backgroundColor: Colors.white,
      body: SafeArea(
        child: Column(
          children: [
            const OnboardingHeader(),
            Expanded(
              child: PageView.builder(
                controller: _controller,
                itemCount: _pages.length,
                onPageChanged: (index) => setState(() => _currentPage = index),
                itemBuilder: (context, index) => _OnboardingPageView(
                  data: _pages[index],
                  currentPage: _currentPage,
                  pageCount: _pages.length,
                ),
              ),
            ),
            Padding(
              padding: const EdgeInsets.fromLTRB(24, 0, 24, 20),
              child: OnboardingActions(
                primaryLabel: page.primaryLabel,
                onPrimaryPressed: _onPrimaryPressed,
              ),
            ),
          ],
        ),
      ),
    );
  }
}

class _OnboardingPageView extends StatelessWidget {
  final _OnboardingPageData data;
  final int currentPage;
  final int pageCount;

  const _OnboardingPageView({
    required this.data,
    required this.currentPage,
    required this.pageCount,
  });

  @override
  Widget build(BuildContext context) {
    return LayoutBuilder(
      builder: (context, constraints) {
        return SingleChildScrollView(
          padding: const EdgeInsets.symmetric(horizontal: 24),
          child: ConstrainedBox(
            constraints: BoxConstraints(minHeight: constraints.maxHeight),
            child: Center(
              child: Column(
                mainAxisSize: MainAxisSize.min,
                children: [
                  SizedBox(
                    height: 210,
                    child: ImageUtils.asset(data.image, fit: BoxFit.contain),
                  ),
                  const SizedBox(height: 8),
                  if (data.categories != null)
                    Wrap(
                      alignment: WrapAlignment.center,
                      spacing: 16,
                      runSpacing: 12,
                      children: [
                        for (final c in data.categories!) FeatureIconItem(image: c.$1, label: c.$2),
                      ],
                    ),
                  if (data.features != null)
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                      children: [
                        for (final f in data.features!)
                          Expanded(
                            child: FeatureDetailCard(icon: f.icon, title: f.title, description: f.description),
                          ),
                      ],
                    ),
                  const SizedBox(height: 20),
                  RichText(
                    textAlign: TextAlign.center,
                    text: TextSpan(
                      style: const TextStyle(fontSize: 20, fontWeight: FontWeight.w800, color: AppColors.textPrimary),
                      children: [
                        for (final segment in data.title)
                          TextSpan(text: segment.text, style: TextStyle(color: segment.color)),
                      ],
                    ),
                  ),
                  const SizedBox(height: 10),
                  Text(
                    data.description,
                    textAlign: TextAlign.center,
                    style: const TextStyle(fontSize: 13, color: AppColors.textSecondary, height: 1.5),
                  ),
                  const SizedBox(height: 16),
                  Row(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: List.generate(
                      pageCount,
                      (index) => AnimatedContainer(
                        duration: const Duration(milliseconds: 250),
                        margin: const EdgeInsets.symmetric(horizontal: 4),
                        width: currentPage == index ? 22 : 8,
                        height: 8,
                        decoration: BoxDecoration(
                          color: currentPage == index ? AppColors.brandBlue : AppColors.skylineFill,
                          borderRadius: BorderRadius.circular(4),
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
    );
  }
}
