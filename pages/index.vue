<script setup>
import NavigationMobile from "~/components/home/NavigationMobile.vue";
import DesktopNavigation from "~/components/home/DesktopNavigation.vue";
import { useDisplay } from "vuetify";
const { mobile } = useDisplay();
</script>

<template>
  <v-container fluid :class="`py-4 ${mobile ? 'px-0' : ''} wrapper`">
    <v-main class="d-flex flex-column ga-16">
      <!-- Navigation -->
      <nav class="d-flex align-center justify-space-between">
        <div class="d-flex ga-2 align-center">
          <SvgIcon name="logo" />
          <SvgIcon name="title" />
        </div>

        <NavigationMobile v-if="mobile" />
        <DesktopNavigation v-else />
      </nav>

      <!-- Header Section -->
      <v-row
        id="header"
        class="d-flex justify-space-between align-center ga-16"
        no-gutters
      >
        <v-col
          lg="6"
          md="12"
          sm="12"
          xs="12"
          class="text-right text-header d-flex flex-column ga-4 w-50"
        >
          <h2 style="font-size: 45px">
            جميع اعمال
            <span class="text-primary"> الصيانة</span>
            و
            <span class="text-primary"> التركيب</span>
            من منتجات سمنان بين يديك
          </h2>
          <p class="text-gray-gray-500 w-75" style="font-size: 18px">
            الآن يمكنك طلب تركيب جديد او طلب فني لصيانة منتجك من خلال تطبيق
            سمنان ومتابعة جميع التفاصيل
          </p>
          <p class="text-header">حمل التطبيق الآن</p>
          <div class="d-flex ga-4 flex-wrap">
            <img src="../assets/icons/play-store.svg" alt="play-store btn" />
            <img src="../assets/icons/app-store.svg" alt="app-store btn" />
          </div>
        </v-col>
        <v-col lg="5" md="12" sm="12" xs="12">
          <img src="../assets/icons/mobile-app-hero.svg" alt="app image" />
        </v-col>
      </v-row>

      <!-- About Us -->
      <v-row
        id="about-us"
        class="d-flex justify-space-between align-center text-right ga-16"
        no-gutters
      >
        <v-col
          lg="6"
          md="12"
          sm="12"
          xs="12"
          class="d-flex flex-column ga-4 w-50"
        >
          <div>
            <v-chip
              pill
              color="primary"
              variant="tonal"
              class="text-primary bg-pri-light font-weight-medium"
            >
              <span> عن سمنان </span>
            </v-chip>
          </div>

          <h3 class="text-secondary font-weight-medium" style="font-size: 45px">
            سمنان لحلول المياه - ريادة في تقديم حلول متكاملة للمياه
          </h3>
          <span class="text-body">
            شركة سمنان لحلول المياه، تأسست عام 2016 ككيان مستقل لتقديم حلول
            متكاملة ومبتكرة في مجال المياه. نقدم مجموعة واسعة من المنتجات
            والخدمات تشمل أجهزة ومحطات تحلية المياه، مضخات المياه المنزلية
            والزراعية، الغطاسات، المحركات الكهربائية، وحلول رفع المياه.
          </span>
          <span class="text-body">
            نفخر بخدمتنا الممتدة عبر 60 فرعاً ومركز صيانة في جميع أنحاء المملكة،
            حيث نعمل على تلبية احتياجات عملائنا من خلال فريق متخصص من مهندسي
            المبيعات ذوي الخبرة والكفاءة العالية، لضمان تقديم أفضل الحلول التي
            تتناسب مع متطلباتكم.
          </span>
        </v-col>

        <v-col lg="5" md="12" sm="12" xs="12">
          <img
            src="../assets/icons/engaged-user.svg"
            alt="engaged user image"
          />
        </v-col>
      </v-row>

      <!-- Flow -->
      <v-row class="d-flex justify-center align-center ga-16">
        <HomeServiceWorkflow />
      </v-row>

      <!-- Services -->
      <v-row id="services">
        <v-col
          cols="12"
          class="text-center d-flex justify-center align-center flex-column ga-3"
        >
          <v-chip
            pill
            color="primary"
            variant="tonal"
            class="text-primary bg-pri-light font-weight-medium"
          >
            عن خدماتنا
          </v-chip>

          <h4 class="text-secondary font-weight-medium" style="font-size: 32px">
            اهم خدمات تطبيقنا
          </h4>
          <p class="text-color-text">
            في سمنان نهتم بكل التفاصيل و كل ما تحتاج لراحتك و خدمتك
          </p>
        </v-col>

        <v-row
          class="mx-auto d-flex align-center justify-space-between"
          :class="mobile ? 'ga-16' : ''"
        >
          <v-col
            lg="3"
            md="12"
            sm="12"
            xs="12"
            class="text-right d-flex flex-column ga-16"
          >
            <div>
              <h3
                class="text-gray-800 font-weight-meduim"
                style="font-size: 20px"
              >
                صيانة دورية
              </h3>
              <p class="text-body">
                يمكنك طلب في القيام بصيانة دورية واستمرار للحفاظ على أجهزتك من
                التلف.
              </p>
            </div>
            <div>
              <h3
                class="text-gray-800 font-weight-meduim"
                style="font-size: 20px"
              >
                الدعم & الدفع الإلكتروني
              </h3>
              <p class="text-body">
                يقوم فريقنا بدعم العملاء بتقنيات قوية بالإضافة لإمكانية الدفع
                الرقمي في قطع الغيار وسعر الصيانة.
              </p>
            </div>
          </v-col>

          <v-col
            lg="6"
            :style="` ${
              mobile ? ' margin-right: -5rem; padding: 0; width: 90%; ' : ''
            }`"
          >
            <img src="../assets/icons/app-capabillities.svg" alt=" app image" />
          </v-col>

          <v-col
            lg="3"
            md="12"
            sm="12"
            xs="12"
            class="text-right d-flex flex-column ga-16"
          >
            <div>
              <h3
                class="text-gray-800 font-weight-meduim"
                style="font-size: 20px"
              >
                تركيب جديد
              </h3>
              <p class="text-body">
                عند شرائك لمنتجاتنا لأول مرة تستطيع طلب في ليقوم بتركيب الجهاز.
              </p>
            </div>
            <div>
              <h3
                class="text-gray-800 font-weight-meduim"
                style="font-size: 20px"
              >
                صيانة عاجلة
              </h3>
              <p class="text-body">
                حين حدوث تلف مفاجئ في جهازك تستطيع طلب في ليحضر مختص لحل المشكلة
                بسرعة ووقت قياسي.
              </p>
            </div>
          </v-col>
        </v-row>
      </v-row>

      <!-- Store -->
      <v-row
        id="store"
        class="d-flex justify-space-between align-center text-right ga-16"
      >
        <v-col
          lg="6"
          md="12"
          sm="12"
          xs="12"
          class="d-flex flex-column ga-4 w-50"
        >
          <div>
            <v-chip
              pill
              color="primary"
              variant="tonal"
              class="text-primary bg-pri-light font-weight-medium"
            >
              عن متجرنا الاكتروني
            </v-chip>
          </div>

          <h4 class="text-secondary text-3xl font-medium">
            يمكنك تصفح و شراء منتجاتنا من مكانك
          </h4>
          <p class="text-color-text">
            نوفر لك تجربة تسوق متكاملة عبر متجرنا الإلكتروني، حيث يمكنك استكشاف
            جميع منتجات سمنان لحلول المياه بكل سهولة. تصفح خياراتنا المتنوعة من
            أجهزة ومحطات تحلية المياه، مضخات المياه، الغطاسات، وغيرها، واطلب ما
            تحتاجه مباشرة من أي مكان وفي أي وقت
          </p>

          <div>
            <v-btn color="primary" class="rounded-lg w-50" size="large">
              تصفح المتجر
            </v-btn>
          </div>
        </v-col>

        <v-col lg="5" md="12" sm="12" xs="12">
          <img
            src="../assets/icons/mobile-overview.svg"
            alt="mobile overview image"
          />
        </v-col>
      </v-row>

      <!-- Branches -->
      <v-row id="branches">
        <v-col
          cols="12"
          class="text-center d-flex justify-center align-center flex-column ga-3"
        >
          <v-chip
            pill
            color="primary"
            variant="tonal"
            class="text-primary bg-pri-light font-weight-medium"
          >
            فروعنا
          </v-chip>
          <h4 class="text-secondary font-weight-bold" style="font-size: 32px">
            نقوم بتغطيه المملكة بالكامل
          </h4>
          <p class="text-color-text">تعرف على فروعنا و منافذ الخدمة عندنا</p>
        </v-col>
        <v-col cols="12" class="d-flex justify-center align-center">
          <img
            src="../assets/icons/sa-map.svg"
            alt="sa map image"
            class="w-100"
          />
        </v-col>
      </v-row>

      <!-- App -->
      <v-row class="d-flex justify-space-between align-center text-right pb-0">
        <v-col
          xl="6"
          lg="6"
          md="6"
          sm="12"
          xs="12"
          class="d-flex flex-column ga-4 w-50"
        >
          <h4 class="text-secondary font-weight-medium" style="font-size: 32px">
            جميع منتجاتنا و خدماتنا و اجهزتك بين يديك لضمان راحتك
          </h4>
          <p class="text-header">حمل التطبيق الآن</p>
          <div class="d-flex ga-4 flex-wrap">
            <img src="../assets/icons/play-store.svg" alt="play-store btn" />
            <img src="../assets/icons/app-store.svg" alt="app-store btn" />
          </div>
        </v-col>
        <v-col xl="6" lg="6" md="6" sm="12" xs="12" class="pb-0 mb-0">
          <img
            src="../assets/icons/mobile-interface.svg"
            alt="mobile interface"
          />
        </v-col>
      </v-row>
    </v-main>
  </v-container>

  <!-- Footer -->
  <footer
    class="py-10 d-flex flex-column align-center ga-6 mt-n3"
    style="border-top: 1px solid #223f99"
  >
    <div class="d-flex justify-center align-center ga-2">
      <SvgIcon name="logo" />
      <SvgIcon name="title" />
    </div>
    <nav
      class="d-flex flex-wrap flex-row-reverse justify-center ga-6 w-33 text-gray-800"
    >
      <a href="#header">الرئيسية</a>
      <a href="#about-us">من نحن</a>
      <a href="#services">خدماتنا</a>
      <a href="#store">متجرنا الإلكتروني</a>
      <a href="#branches">فروعنا</a>
      <a href="#">الشروط و الأحكام</a>
      <a href="#">سياسة الخصوصية</a>
    </nav>
    <div :class="`d-flex ${mobile ? 'flex-column justify-center' : ''} ga-4`">
      <img src="../assets/icons/play-store.svg" alt="play-store btn" />
      <img src="../assets/icons/app-store.svg" alt="app-store btn" />
    </div>
  </footer>

  <!-- Bottom bar -->
  <div class="border-t py-12">
    <v-container fluid class="py-4 d-flex align-center justify-space-between">
      <p class="text-secondary">جميع الحقوق محفوطة</p>
      <div class="d-flex align-center ga-4">
        <SvgIcon name="facebook" />
        <SvgIcon name="linkedin" />
        <SvgIcon name="twitter" />
        <SvgIcon name="instagram" />
      </div>
    </v-container>
  </div>
</template>
<style scoped lang="scss">
.wrapper {
  overflow-x: hidden;
}
</style>
