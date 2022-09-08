//import faker library
const { faker } = require('@faker-js/faker');
const boom = require('@hapi/boom');

class ProductsService  {

    constructor(){
        this.products = [];
        this.generate();
    };

    async generate(){
        const limit = 100;

        for(let i = 0; i < limit; i++){
            this.products.push({
                id: i,
                name: faker.commerce.product(),
                price: parseInt(faker.commerce.price(), 10),
                image: faker.image.imageUrl()
            })
        };
    };

    async find(){
        return this.products;
    };

    async findOne(index){
        const target = this.products.filter(product => product.id == index);
        if(target.length == 0){
            throw boom.notFound('Product not found');
        }

        return target;
    };

    async create(data){
        const newProduct = {
            id: this.products.length + 1,
            ...data
        }
        this.products.push(newProduct);
        return newProduct
    };

    async update(id, changes){
        const index = this.products.findIndex(item => item.id == id);

        if(index === -1){
            throw boom.notFound('Product not found');
        }

        this.products[index] = {...this.products[index], ...changes}
        return this.products[index]
    };

    async delete(id){
        const index = this.products.findIndex(item => item.id == id);

        if(index === -1){
            throw boom.notFound('Product not found');
        };

        this.products.splice(index, 1)
        return { message: 'that was deleted' }
    };
};

module.exports = ProductsService;
