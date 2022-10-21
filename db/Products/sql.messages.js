module.exports = class SQLCientChat{
    constructor (config, tableName){
        this.knex= require('knex')(config)
        this.table= tableName
    }
    async getByIdDB(id){
        try{
            const message = await this.knex
                .from(this.table)
                .select("date", "author", "text")
                .where({ id: id })
                return message
        } catch(error){
            console.log(error.message);
        }
    }
    async traer(){
        try{
            const messages= await this.knex.from(this.table).select("date", "author", "text")
            console.table(messages)
            return messages
        }
        catch(error){
            console.log(error.message);
    }
}
    async guardar(message){
        try{
            await knex(this.table).insert(message)
            /* await this.knex(this.table).insert(message) */

        } catch (error){
            console.log(error.message);
        }
    }
    async updateDB(message, id){
        try{
            await this.knex.from(this.table).where({id:id}).update({message})
        }catch(error){
            console.log(error.message);
        }
    }
    async deleteByIdDB(id){
        try{
            await this.knex.from(this.table).where({id:id}).del(); 
        }catch(error){
            console.log(error.message);
        }
    }
    async deleteAllDB(){
        try{
            await this.knex.from(this.table).del()
        }catch(error){
            console.log(error.message);
        }
    }
}