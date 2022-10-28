import prisma from "../config/db"

class CountriesRepository {
   async getAll(){
      return await prisma.countries.findMany()
   }
}

export default new CountriesRepository();