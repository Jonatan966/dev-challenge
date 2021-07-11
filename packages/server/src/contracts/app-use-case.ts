import autoBind from 'auto-bind'

export abstract class AppUseCase<DTO = unknown, ENTITY = unknown> {
  public constructor() {
    autoBind(this)
  }

  public abstract execute(data?: DTO): Promise<ENTITY>
}
