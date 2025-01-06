<template>
  <div class="location-page q-pa-md">
    <div class="row q-col-gutter-md">
      <!-- Header Section -->
      <div class="col-12">
        <q-card class="my-card">
          <q-card-section>
            <div class="text-h6">Location Management</div>
            <div class="text-subtitle2">Track and manage your locations</div>
          </q-card-section>
        </q-card>
      </div>

      <!-- Add Location Button -->
      <div class="col-12">
        <q-btn
          color="primary"
          icon="add_location"
          label="Add New Location"
          @click="openAddDialog"
        />
      </div>

      <!-- Location List -->
      <div class="col-12">
        <q-card>
          <q-table
            :rows="locations"
            :columns="columns"
            row-key="id"
            :filter="filter"
          >
            <template v-slot:top-right>
              <q-input
                borderless
                dense
                debounce="300"
                v-model="filter"
                placeholder="Search"
              >
                <template v-slot:append>
                  <q-icon name="search" />
                </template>
              </q-input>
            </template>

            <template v-slot:body-cell-actions="props">
              <q-td :props="props">
                <q-btn-group spread flat>
                  <q-btn
                    color="primary"
                    icon="edit"
                    flat
                    dense
                    @click="editLocation(props.row)"
                  />
                  <q-btn
                    color="negative"
                    icon="delete"
                    flat
                    dense
                    @click="deleteLocation(props.row)"
                  />
                </q-btn-group>
              </q-td>
            </template>
          </q-table>
        </q-card>
      </div>
    </div>

    <!-- Add/Edit Location Dialog -->
    <q-dialog v-model="showDialog" persistent>
      <q-card style="min-width: 350px">
        <q-card-section>
          <div class="text-h6">
            {{ editingLocation ? "Edit" : "Add" }} Location
          </div>
        </q-card-section>

        <q-card-section>
          <q-form @submit="saveLocation" class="q-gutter-md">
            <q-input
              v-model="locationForm.name"
              label="Location Name"
              :rules="[(val) => !!val || 'Name is required']"
            />
            <q-input
              v-model="locationForm.address"
              label="Address"
              :rules="[(val) => !!val || 'Address is required']"
            />
            <q-input
              v-model.number="locationForm.latitude"
              label="Latitude"
              type="number"
              step="any"
              :rules="[(val) => !!val || 'Latitude is required']"
            />
            <q-input
              v-model.number="locationForm.longitude"
              label="Longitude"
              type="number"
              step="any"
              :rules="[(val) => !!val || 'Longitude is required']"
            />
            <q-input
              v-model="locationForm.description"
              label="Description"
              type="textarea"
            />

            <div class="row justify-end q-gutter-sm">
              <q-btn label="Cancel" color="negative" v-close-popup flat />
              <q-btn label="Save" type="submit" color="primary" />
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup>
import { ref } from "vue";

// Table columns definition
const columns = [
  {
    name: "name",
    required: true,
    label: "Location Name",
    align: "left",
    field: (row) => row.name,
    sortable: true,
  },
  {
    name: "address",
    required: true,
    label: "Address",
    align: "left",
    field: (row) => row.address,
    sortable: true,
  },
  {
    name: "latitude",
    label: "Latitude",
    field: "latitude",
    sortable: true,
  },
  {
    name: "longitude",
    label: "Longitude",
    field: "longitude",
    sortable: true,
  },
  {
    name: "actions",
    label: "Actions",
    field: "actions",
  },
];

// Sample data - replace with your API calls
const locations = ref([
  {
    id: 1,
    name: "Main Office",
    address: "123 Business Street",
    latitude: 40.7128,
    longitude: -74.006,
    description: "Main headquarters",
  },
  // Add more sample locations as needed
]);

// Form and dialog controls
const showDialog = ref(false);
const editingLocation = ref(null);
const filter = ref("");

const locationForm = ref({
  name: "",
  address: "",
  latitude: null,
  longitude: null,
  description: "",
});

// Functions
function openAddDialog() {
  editingLocation.value = null;
  locationForm.value = {
    name: "",
    address: "",
    latitude: null,
    longitude: null,
    description: "",
  };
  showDialog.value = true;
}

function editLocation(location) {
  editingLocation.value = location;
  locationForm.value = { ...location };
  showDialog.value = true;
}

function deleteLocation(location) {
  // Add confirmation dialog
  if (confirm("Are you sure you want to delete this location?")) {
    // Add your delete logic here
    locations.value = locations.value.filter((loc) => loc.id !== location.id);
  }
}

async function saveLocation() {
  try {
    if (editingLocation.value) {
      // Update existing location
      const index = locations.value.findIndex(
        (loc) => loc.id === editingLocation.value.id
      );
      locations.value[index] = {
        ...editingLocation.value,
        ...locationForm.value,
      };
    } else {
      // Add new location
      locations.value.push({
        id: Date.now(), // Replace with proper ID from your backend
        ...locationForm.value,
      });
    }
    showDialog.value = false;
  } catch (error) {
    console.error("Error saving location:", error);
  }
}
</script>

<style scoped>
.my-card {
  background: linear-gradient(145deg, #3498db, #2980b9);
  color: white;
}
</style>
