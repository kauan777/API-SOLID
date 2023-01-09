import { User } from "../../entities/User";
import { IMailProvider } from "../../providers/IMailProvider";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { CreateUserDTO } from "./CreateUserDTO";

export class CreateUserUseCase {
  constructor(
    private usersRepository: IUsersRepository,
    private mailProvider: IMailProvider
  ) {}

  async execute({ email, name, password }: CreateUserDTO) {
    const userAlreadyExists = await this.usersRepository.findByEmail(email);

    if (userAlreadyExists) {
      throw new Error("user already exists");
    }

    const user = new User({
      email,
      name,
      password,
    });

    this.usersRepository.create(user);
    await this.mailProvider.sendMail({
      to: {
        name,
        email,
      },
      from: {
        name: "Equipe do meu app",
        email: "equipe@meuapp.com",
      },
      subject: "Seja bem vindo a plataforma",
      body: "<p>Você ja pode fazer login em nossa plataforma</p>",
    });
  }
}
