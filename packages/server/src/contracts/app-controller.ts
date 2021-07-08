import { Request, Response } from 'express'
import autoBind from 'auto-bind'

export abstract class AppController<DTO = unknown> {
  protected constructor() {
    autoBind(this)
  }

  public abstract handle(
    request: Request<unknown, unknown, DTO>,
    response: Response
  ): Promise<Response>
}
