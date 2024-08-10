<template>
  <div class="bg-white rounded-lg shadow-xl w-42">
    <img
      :src="hotel.image"
      alt="Hotel Image"
      class="w-96 h-56 object-cover rounded-lg"
    />
    <h2 class="text-xl font-bold mt-2">{{ hotel.name }}</h2>
    <p class="text-gray-600 mt-1">Price: ${{ hotel.price }}</p>
    <div class="rating mt-2"></div>
  </div>
</template>

<script>
export default {
  name: "HotelCard",
  props: {
    hotel: Object,
  },
};
</script>
