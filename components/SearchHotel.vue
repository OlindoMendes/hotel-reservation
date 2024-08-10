<template>
  <div class="bg-gray-100">
    <!-- Hero Section -->
    <section class="bg-white py-16">
      <div class="container mx-auto px-4 text-center">
        <h1 class="text-4xl font-bold text-gray-800">
          Find Your Perfect Hotel
        </h1>
        <p class="text-gray-600 mt-4">
          Book hotels at the best prices with ease.
        </p>

        <!-- Search Form -->
        <form @submit.prevent="searchHotels" class="mt-8 max-w-full mx-auto">
          <div
            class="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4"
          >
            <input
              type="text"
              placeholder="Where are you going ?"
              v-model="destination"
              class="w-full h-12 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
            <input
              type="date"
              placeholder="check in"
              v-model="checkInDate"
              class="w-full h-12 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-300"
            />
            <input
              type="date"
              placeholder="check out"
              v-model="checkOutDate"
              class="w-full h-12 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-300"
            />
            <div class="relative inline-block text-left w-full">
              <button
                @click="toggleDropdown"
                class="inline-flex justify-between items-center w-full h-12 rounded-md border border-gray-300 shadow-sm p-3 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-2 focus:ring-blue-300"
              >
                Select Guests and Rooms
                <svg
                  class="-mr-1 ml-2 h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10 12a1 1 0 01-.7-.29l-5-5a1 1 0 111.4-1.42L10 9.58l4.3-4.29a1 1 0 111.4 1.42l-5 5A1 1 0 0110 12z"
                    clip-rule="evenodd"
                  />
                </svg>
              </button>

              <div
                v-if="isOpen"
                class="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10"
              >
                <div class="py-1 px-4">
                  <!-- Adults -->
                  <div class="flex items-center justify-between py-2">
                    <label
                      for="adults"
                      class="block text-sm font-medium text-gray-700"
                      >Adults</label
                    >
                    <input
                      v-model.number="adults"
                      type="number"
                      min="1"
                      id="adults"
                      class="w-16 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-center"
                    />
                  </div>

                  <!-- Children -->
                  <div class="flex items-center justify-between py-2">
                    <label
                      for="children"
                      class="block text-sm font-medium text-gray-700"
                      >Children</label
                    >
                    <input
                      v-model.number="children"
                      type="number"
                      min="0"
                      id="children"
                      class="w-16 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-center"
                    />
                  </div>

                  <!-- Rooms -->
                  <div class="flex items-center justify-between py-2">
                    <label
                      for="rooms"
                      class="block text-sm font-medium text-gray-700"
                      >Rooms</label
                    >
                    <input
                      v-model.number="rooms"
                      type="number"
                      min="1"
                      id="rooms"
                      class="w-16 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-center"
                    />
                  </div>

                  <!-- Save Button -->
                  <div class="flex justify-end py-2">
                    <button
                      @click="saveSelection"
                      class="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                    >
                      Save
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <button
              type="submit"
              class="w-full h-11 sm:w-auto px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Search
            </button>
          </div>
        </form>
      </div>
    </section>

    <!-- Hotel Results Section -->
    <section class="py-16">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl font-semibold text-gray-800 mb-8">
          Available Hotels
        </h2>
        <div
          class="flex flex-row gap-4 justify-end h-12 items-center bg-white p-6 mb-4"
        >
          <label for="sort">Order by:</label>
          <select class="bg-white" v-model="sortBy">
            <option value="price">Price</option>
            <option value="rating">Raatings</option>
            <option value="name">Name</option>
            <!-- Adicione mais critérios conforme necessário -->
          </select>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <div
            v-for="hotel in destinationSearch"
            :key="hotel.id"
            class="bg-white p-6 rounded-lg shadow-md"
          >
            <img
              :src="hotel.image"
              :alt="hotel.name"
              class="w-full h-48 object-cover rounded-md"
            />
            <h3 class="text-xl font-bold text-gray-800 mt-4">
              {{ hotel.name }}
            </h3>
            <p class="text-gray-600 mt-2">{{ hotel.location }}</p>
            <p class="text-gray-400 mt-2">
              {{ hotel.rating }} <span>stars</span>
            </p>
            <p class="text-blue-600 font-semibold mt-4">
              {{ hotel.price }}/night
            </p>
            <button
              class="block w-full mt-4 text-center bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
              @click="makeReservation(hotel.id)"
            >
              Book Now
            </button>
          </div>
        </div>
      </div>
    </section>

    <HotelBookingModal
      :is-open="openModal"
      :reservation="reservation"
      :book="guests"
      @close="closeModal"
    />

    <!-- Footer -->
    <footer class="bg-blue-600 py-4">
      <div class="container mx-auto text-center text-white">
        <p>&copy; 2024 HotelFinder. All rights reserved.</p>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, reactive } from "vue";

// Define types for hotel and guests
interface Hotel {
  id: number;
  name: string;
  location: string;
  price: number;
  image: string;
  rating: number;
}

interface Guests {
  rooms: number;
  adults: number;
  children: number;
  checkin: string;
  checkout: string;
}

// Reactive state
const destination = ref<string>("");
const checkInDate = ref<string>("");
const checkOutDate = ref<string>("");
const isOpen = ref<boolean>(false);
const adults = ref<number>(1);
const children = ref<number>(0);
const rooms = ref<number>(1);
const sortBy = ref<string>("price");
const openModal = ref<boolean>(false);
const reservation = ref<Hotel | null>(null);
const guests = ref<Guests>({
  rooms: 1,
  adults: 1,
  children: 0,
  checkin: "",
  checkout: "",
});

// Hotel data
const hotels = reactive<Hotel[]>([
  {
    id: 1,
    name: "Hotel Sunshine",
    location: "Rio de Janeiro",
    price: 150,
    image: "/images/image1.png",
    rating: 4.5,
  },
  {
    id: 2,
    name: "Mountain Retreat",
    location: "Campos do Jordão",
    price: 200,
    image: "/images/image2.png",
    rating: 3.5,
  },
  {
    id: 3,
    name: "City Lights Hotel",
    location: "São Paulo",
    price: 180,
    image: "/images/image3.png",
    rating: 4,
  },
  {
    id: 4,
    name: "Beachfront Paradise",
    location: "Florianópolis",
    price: 220,
    image: "/images/image5.png",
    rating: 4.5,
  },
  {
    id: 5,
    name: "Luxury Stay",
    location: "Curitiba",
    price: 250,
    image: "/images/image4.png",
    rating: 5,
  },
  {
    id: 6,
    name: "Budget Inn",
    location: "Porto Alegre",
    price: 100,
    image: "/images/image6.png",
    rating: 3.5,
  },
  {
    id: 7,
    name: "Urban Escape",
    location: "Salvador",
    price: 190,
    image: "/images/image7.png",
    rating: 4,
  },
  {
    id: 8,
    name: "Seaside Resort",
    location: "Recife",
    price: 210,
    image: "/images/image8.png",
    rating: 5,
  },
  {
    id: 9,
    name: "Cozy Cottage",
    location: "Gramado",
    price: 130,
    image: "/images/image9.png",
    rating: 3.5,
  },
  {
    id: 10,
    name: "Business Hotel",
    location: "Belo Horizonte",
    price: 170,
    image: "/images/image10.png",
    rating: 4,
  },
  {
    id: 11,
    name: "Boutique Hotel",
    location: "Brasília",
    price: 240,
    image: "/images/image11.png",
    rating: 5,
  },
  {
    id: 12,
    name: "Desert Oasis",
    location: "Natal",
    price: 200,
    image: "/images/image12.png",
    rating: 4,
  },
]);

const destinationSearch = computed(() => {
  if (destination.value) {
    return hotels.filter((hotel) =>
      hotel.location.toLowerCase().includes(destination.value.toLowerCase()),
    );
  }
  if (sortBy.value) {
    return hotels.slice().sort((a, b) => {
      switch (sortBy.value) {
        case "price":
          return a.price - b.price;
        case "rating":
          return b.rating - a.rating;
        case "name":
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });
  }
  return hotels;
});

const toggleDropdown = () => {
  isOpen.value = !isOpen.value;
};

const saveSelection = () => {
  guests.value = {
    rooms: rooms.value,
    adults: adults.value,
    children: children.value,
    checkin: checkInDate.value,
    checkout: checkOutDate.value,
  };
  isOpen.value = false;
};

const makeReservation = (id: number) => {
  openModal.value = true;
  const hotel = hotels.find((hotel) => hotel.id === id) || null;
  reservation.value = hotel;
};

const closeModal = (payload: boolean) => {
  openModal.value = payload;
};
</script>
