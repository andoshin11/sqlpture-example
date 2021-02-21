import * as schema from './schema'

export type DB = {
  dialect: 'postgres';
  schema: {
    actor: schema.actor
		actor_info: schema.actor_info
		address: schema.address
		category: schema.category
		city: schema.city
		country: schema.country
		customer: schema.customer
		customer_list: schema.customer_list
		film: schema.film
		film_actor: schema.film_actor
		film_category: schema.film_category
		film_list: schema.film_list
		inventory: schema.inventory
		language: schema.language
		nicer_but_slower_film_list: schema.nicer_but_slower_film_list
		payment: schema.payment
		rental: schema.rental
		sales_by_film_category: schema.sales_by_film_category
		sales_by_store: schema.sales_by_store
		staff: schema.staff
		staff_list: schema.staff_list
		store: schema.store
  }
}
