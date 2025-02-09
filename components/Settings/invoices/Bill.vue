<script setup lang="ts">
import type { InvoiceInterface } from "@/types/technician";
withDefaults(
  defineProps<{
    showActions: boolean;
    invoiceDetails: InvoiceInterface;
  }>(),
  {
    showActions: true,
  }
);

const { t, locale } = useI18n();
const { formatToDateString } = useDateTimeFormate(locale.value);
const showModal = ref(false);
</script>

<template>
  <div>
    <v-card flat rounded="xl" class="border bill-view">
      <v-card-text>
        <h2 class="">{{ t("operations.view_bill") }}</h2>
        <v-card class="mt-4" rounded="lg" elevation="2">
          <v-card-text>
            <div class="d-flex justify-center align-center ga-2">
              <AppSvgIcon name="logo" size="lg" />
              <AppSvgIcon name="title" :size="60" />
            </div>

            <!-- details -->
            <div class="mt-10 bill-details">
              <div class="item" v-if="invoiceDetails.invoice_number">
                <div class="label">{{ t("operations.bill_number") }}</div>
                <div class="value">{{ invoiceDetails.invoice_number }}</div>
              </div>
              <div class="item">
                <div class="label">{{ t("operations.client_name") }}</div>
                <div class="value">
                  {{
                    invoiceDetails.customerName?.first_name +
                    " " +
                    invoiceDetails.customerName?.last_name
                  }}
                </div>
              </div>
              <div class="item">
                <div class="label">{{ t("operations.order_type") }}</div>
                <div class="value">
                  {{ t("operations." + invoiceDetails.type) }}
                </div>
              </div>
              <div class="item">
                <div class="label">{{ t("operations.device") }}</div>
                <div class="value">{{ invoiceDetails.productName }}</div>
              </div>
              <div class="item">
                <div class="label">{{ t("operations.location") }}:</div>
                <div class="value">
                  {{ invoiceDetails.address.name }},
                  {{ invoiceDetails.address?.street }} ,{{
                    invoiceDetails.address?.national_address
                  }}
                </div>
              </div>
              <div class="item">
                <div class="label">{{ t("operations.day") }}</div>
                <div class="value">
                  {{
                    formatToDateString(invoiceDetails.date) +
                    " " +
                    invoiceDetails.time
                  }}
                </div>
              </div>
              <!-- <div class="item">
                <div class="label">{{ t("operations.time") }}:</div>
                <div class="value">
                  {{ formatToDateString(invoiceDetails.time) }}
                </div>
              </div> -->
            </div>

            <!-- table details -->
            <div class="table">
              <div class="row">
                <div class="cell">العنصر</div>
                <div class="cell">السعر</div>
                <div class="cell">الكمية</div>
                <div class="cell">المحموع</div>
              </div>
              <div class="row" v-for="item in invoiceDetails.service">
                <div class="cell">{{ item.name }}</div>
                <div class="cell">{{ item.price }} ر.س</div>
                <div class="cell">1</div>
                <div class="cell">{{ item.price }} ر.س</div>
              </div>
            </div>

            <!-- payment details -->
            <div>
              <div class="d-flex align-center justify-space-between mb-2">
                <h5>{{ t("operations.payment_method") }}</h5>
                <h5>{{ invoiceDetails.payment_method }}</h5>
              </div>
              <div class="d-flex align-center justify-space-between mb-2">
                <h5>{{ t("operations.payment_status") }}</h5>
                <h5 class="text-warning">{{ invoiceDetails.status }}</h5>
              </div>
              <div class="d-flex align-center justify-space-between">
                <h4 class="font-weight-medium">{{ t("operations.total") }}</h4>
                <h4 class="font-weight-medium">
                  {{ invoiceDetails.total }} ر.س
                </h4>
              </div>
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
