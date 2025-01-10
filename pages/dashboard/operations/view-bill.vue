<template>
  <div>
    <v-card flat rounded="xl" class="border bill-view">
      <v-card-text>
        <h2 class="">{{ $t("operations.view_bill") }}</h2>
        <v-card class="mt-4" rounded="lg" elevation="2">
          <v-card-text>
            <div class="d-flex justify-center align-center ga-2">
              <AppSvgIcon name="logo" />
              <AppSvgIcon name="title" />
            </div>

            <!-- details -->
            <div class="mt-10 bill-details">
              <div class="item">
                <div class="label">{{ $t("operations.bill_number") }}</div>
                <div class="value">123456</div>
              </div>
              <div class="item">
                <div class="label">{{ $t("operations.client_name") }}</div>
                <div class="value">Ahmed Ali</div>
              </div>
              <div class="item">
                <div class="label">{{ $t("operations.order_type") }}</div>
                <div class="value">صيانة عاجلة</div>
              </div>
              <div class="item">
                <div class="label">{{ $t("operations.device") }}</div>
                <div class="value">جهاز تحلية سمنان 5 مراحل</div>
              </div>
              <div class="item">
                <div class="label">{{ $t("operations.location") }}:</div>
                <div class="value">الرياض - حي الجلالة - منزل 144</div>
              </div>
              <div class="item">
                <div class="label">{{ $t("operations.day") }}:</div>
                <div class="value">31 Dec 2022</div>
              </div>
              <div class="item">
                <div class="label">{{ $t("operations.time") }}:</div>
                <div class="value">04:32PM</div>
              </div>
            </div>

            <!-- table details -->
            <div class="table">
              <div class="row">
                <div class="cell">العنصر</div>
                <div class="cell">السعر</div>
                <div class="cell">الكمية</div>
                <div class="cell">المحموع</div>
              </div>
              <div class="row">
                <div class="cell">صامولة ماتور 5 سم</div>
                <div class="cell">12 ر.س</div>
                <div class="cell">1</div>
                <div class="cell">12 ر.س</div>
              </div>
              <div class="row">
                <div class="cell">صامولة ماتور 5 سم</div>
                <div class="cell">12 ر.س</div>
                <div class="cell">1</div>
                <div class="cell">12 ر.س</div>
              </div>
              <div class="row">
                <div class="cell">صامولة ماتور 5 سم</div>
                <div class="cell">12 ر.س</div>
                <div class="cell">1</div>
                <div class="cell">12 ر.س</div>
              </div>
            </div>

            <!-- payment details -->
            <div>
              <div class="d-flex align-center justify-space-between mb-2">
                <h5>{{ $t("operations.payment_method") }}</h5>
                <h5>العميل لم يختر بعد</h5>
              </div>
              <div class="d-flex align-center justify-space-between mb-2">
                <h5>{{ $t("operations.payment_status") }}</h5>
                <h5 class="text-warning">في انتظار الدفع</h5>
              </div>
              <div class="d-flex align-center justify-space-between">
                <h4 class="font-weight-medium">{{ $t("operations.total") }}</h4>
                <h4 class="font-weight-medium">162.00 ر.س</h4>
              </div>
            </div>

            <div class="d-flex ga-2 mt-5">
              <v-btn
                @click="showModal = true"
                color="primary"
                class="flex-grow-1 text-14"
              >
                <AppSvgIcon name="wallet" />
                {{ $t("operations.cash") }}
              </v-btn>

              <v-btn
                :to="localePath('/dashboard/operations/online-pay')"
                color="pri-light"
                class="text-primary flex-grow-1 text-14"
              >
                <AppSvgIcon name="card-pos" />
                {{ $t("operations.oniline_pay") }}
              </v-btn>
            </div>
          </v-card-text>
        </v-card>
      </v-card-text>
    </v-card>
    <app-modal
      title="اختر طريقة الدفع"
      text="هل انت متأكد من رغبتك في الغاء الطلب ؟"
      icon="map"
      v-model:model-value="showModal"
      isDelete
    ></app-modal>
  </div>
</template>

<script setup>
const showModal = ref(false);
</script>

<style lang="scss" scoped>
.bill-view {
  .bill-details {
    .item {
      display: flex;
      margin-bottom: 10px;
      gap: 10px;
      font-size: 12px;
      .value {
        font-weight: 500;
      }
    }
  }
  .table {
    display: table;
    width: 100%;
    font-size: 10px;
    font-weight: 500;
    border-top: 2px dashed #959595;
    border-bottom: 2px dashed #959595;
    margin: 20px 0;
    .row {
      display: table-row;
      &:first-of-type {
        font-weight: 400;
      }
      .cell {
        display: table-cell;
        text-align: center;
        &:first-of-type {
          text-align: start;
        }
        &:last-of-type {
          text-align: end;
        }
      }
    }

    .row,
    .cell {
      padding: 10px;
    }
  }
}
</style>
