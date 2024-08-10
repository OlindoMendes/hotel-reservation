<template>
  <div
    class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
    v-if="isOpen"
  >
    <div
      class="bg-white rounded-lg overflow-hidden shadow-lg max-w-4xl w-full mx-4 sm:mx-8 lg:mx-16"
    >
      <div class="flex flex-col lg:flex-row">
        <!-- Hotel Image -->
        <div class="lg:w-1/2">
          <img
            :src="reservation.image"
            alt="Hotel Image"
            class="w-full h-48 lg:h-full object-cover rounded-t-lg lg:rounded-t-none lg:rounded-l-lg"
          />
          <div class="p-4 lg:p-6">
            <h3 class="text-xl font-bold text-gray-800">
              {{ reservation.name }}
            </h3>
            <p class="text-gray-600">{{ reservation.location }}</p>
            <p class="text-gray-400">
              {{ reservation.rating }} <span>stars</span>
            </p>
            <p class="text-blue-600 font-semibold">
              {{ reservation.price }} /night
            </p>
          </div>
        </div>

        <!-- Form -->
        <div class="w-full lg:w-1/2 p-6">
          <h2 class="text-2xl font-semibold mb-4">Hotel Reservation</h2>

          <form>
            <div class="mb-4">
              <label class="block text-gray-700 text-sm font-bold mb-2"
                >Name</label
              >
              <input
                v-model="name"
                type="text"
                placeholder="Enter your name"
                class="w-full h-12 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-300"
              />
            </div>

            <div class="mb-4">
              <label class="block text-gray-700 text-sm font-bold mb-2"
                >Cellphone</label
              >
              <input
                v-model="contact"
                type="tel"
                placeholder="Enter your cellphone"
                class="w-full h-12 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-300"
              />
            </div>

            <div class="mb-4">
              <label class="block text-gray-700 text-sm font-bold mb-2"
                >Payment Method</label
              >
              <select
                class="w-full h-12 rounded-md border border-gray-300 shadow-sm p-3 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-300"
              >
                <option selected>Choose a payment method</option>
                <option value="card">Credit/Debit Card</option>
                <option value="pix">Pix</option>
                <option value="boleto">Boleto</option>
              </select>
            </div>

            <div
              class="flex flex-col-reverse lg:flex-row items-center justify-between"
            >
              <button
                @click="reserveRoom"
                type="submit"
                class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mb-4 lg:mb-0"
              >
                Reserve
              </button>
              <button
                @click="hideModal"
                type="button"
                class="text-red-500 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

// Define os dados do formulário
const name = ref('');
const contact = ref('');
const paymentDetails = ref('');

const Open = ref(false);
const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false,
  },
  reservation: {
    type: Object,
  },
  book: {
    type: Object,
  },
});

const emit = defineEmits(["close"]);
const closeModal = ref(false);

const hideModal = () => {
  emit("close", closeModal.value);
};
onMounted(() => {});
const reserveRoom = () => {
  if (!name.value || !contact.value || !paymentDetails.value) {
    alert("Por favor, preencha todos os campos.");
    return;
  }

  alert(`Reserva confirmada para ${name.value}`);
  // emit("close", closeModal.value);
};
</script>
