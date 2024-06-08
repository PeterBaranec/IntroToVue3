app.component("product-display", {
  props: {
    cart: {
      type: Number,
    },
  },
  template: `<div class="product-display">
      <div class="product-container">
        <div class="product-image">
          <img v-bind:src="image" :class="{'out-of-stock-img': !inStock}">
        </div>
        <div class="product-info">
          <h1 v-if="!onSale">{{title}}</h1>
          <h1 v-else>{{sale}}</h1>
          <p v-if="inStock">In Stock</p>
          <p v-else>Out of Stock</p>
          <ul>
            <li v-for="detail in details">{{detail}}</li>
          </ul>
          <div v-for="(variant, index) in variants" :key="variant.id" @mouseover="updateVariant(index)"
            class="color-circle" :style="{backgroundColor: variant.color}">
          </div>
          <button class="button" :class="{disabledButton: !inStock}" :disabled="!inStock" v-on:click="addToCart">Add to
            Cart</button>
          <button class="button" v-on:click="removeFromCart" >Remove Item</button>
        </div>
      </div>
    </div>
    `,
  data() {
    return {
      product: "Socks",
      brand: "Vue Mastery",
      selectedVariant: 0,
      onSale: false,
      details: ["50% cotton", "30% wool", "20% polyester"],
      variants: [
        {
          id: 2234,
          color: "green",
          image: "./assets/images/socks_green.jpg",
          quantity: 50,
        },
        {
          id: 2235,
          color: "blue",
          image: "./assets/images/socks_blue.jpg",
          quantity: 0,
        },
      ],
    };
  },
  methods: {
    addToCart() {
      this.$emit("add-to-cart");
    },
    removeFromCart() {
      if (this.cart > 0) {
        this.$emit("remove-from-cart");
      }
    },
    updateVariant(index) {
      this.selectedVariant = index;
    },
  },
  computed: {
    title() {
      return this.brand + " " + this.product;
    },
    image() {
      return this.variants[this.selectedVariant].image;
    },
    inStock() {
      return this.variants[this.selectedVariant].quantity;
    },
    sale() {
      return this.brand + " " + this.product + " " + "is on sale!";
    },
  },
});
