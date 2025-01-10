<template>
  <v-card rounded="xl">
    <v-card-text>
      <h2>{{ $t("operations.my_cards") }}</h2>
      <div class="cards mt-10">
        <div class="card-item">
          <v-img max-width="32px" src="~/assets/imgs/master-card.png"></v-img>
          <div class="card-details">
            <h4 class="fw-300">1253 5432 3521 3090</h4>
            <h5 class="fw-500">KHALED ABU ELJOOD</h5>
          </div>
        </div>
      </div>
      <nuxt-link
        class="text-primary mt-6 fw-400 d-block"
        :to="localePath('/dashboard/operations/add-cards')"
      >
        <v-icon>mdi-plus</v-icon>
        {{ $t("operations.add_new_card") }}
      </nuxt-link>
    </v-card-text>
  </v-card>
</template>

<script setup></script>

<style lang="scss" scoped>
.card-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  background: #20419c;
  color: white;
  border-radius: 12px;
  padding: 20px;
  .card-details {
    text-align: end;
  }
}
</style>
