import { AppDataSource } from '../utils/data-source'
import { NextFunction, Request, Response } from "express"
import axios from 'axios'
import config from 'config'
import { Professor } from '../entities/Professor'

export class ProfessorController {

    private professorRepository = AppDataSource.getRepository(Professor)

    async all(request: Request, response: Response, next: NextFunction) {
        return this.professorRepository.find()
    }

    async one(request: Request, response: Response, next: NextFunction) {
        const nusp = request.params.nusp
        const professor = await this.professorRepository.findOne({
            where: { nusp }
        })

        if (!professor) {
            return "Professor not found!"
        }
        return professor
    }

    async save(request: Request, response: Response, next: NextFunction) {
        const authUrl = config.get<string>('authUrl');
        const { nusp,
                name,
                department,
                email,
                phone,
                password } = request.body;
        
        let professorToAdd = await this.professorRepository.findOneBy({ nusp })
        if (professorToAdd) {
            return "Professor already registered!"
        }

        const professor = Object.assign(new Professor(), {
            nusp,
            name,
            department,
            email,
            phone
        })

        const axiosResponse = await axios.post(authUrl + '/add', {
            email,
            password,
            category: "professor",
            nusp_cnpj: nusp
        })

        return this.professorRepository.save(professor)
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        const nusp = request.params.nusp
        let professorToRemove = await this.professorRepository.findOneBy({ nusp })

        if (!professorToRemove) {
            return "This professor is not registered!"
        }

        await this.professorRepository.remove(professorToRemove)

        return "Professor has been removed!"
    }

}