export type ErrorType =
  /**
   * Database errors
   */
  | "database.error.insert"
  | "database.error.update"
  | "database.error.delete"

  /**
   * Record not found error
   */
  | "record.error.notFound"

  /**
   * Audience erros
   */
  | "audience.error.name.null"
  | "audience.error.name.larger"
  | "audience.error.name.exists"
  | "audience.error.query.null"
  | "audience.error.query.cpf.notFound"
  | "audience.param.error.name.null"
  | "audience.param.error.name.larger"
  | "audience.param.error.typecast.null"
  | "audience.param.error.title.null"
  | "audience.param.error.title.larger"
  | "audience.param.error.typecast.invalid"

  /**
   * App target errors
   */
  | "appTarget.error.name.exists"
  | "appTarget.error.name.null"
  | "appTarget.error.route.null"
  | "appTarget.param.error.name.null"
  | "appTarget.param.error.name.larger"
  | "appTarget.param.error.typecast.null"
  | "appTarget.param.error.title.null"
  | "appTarget.param.error.title.larger"
  | "appTarget.param.error.typecast.invalid"

  /**
   * Campaing errors
   */
  | "campaign.error.channel.notFound"
  | "campaign.error.channel.null"
  | "campaign.error.appTarget.notFound"
  | "campaign.error.appTarget.null"
  | "campaign.error.audience.notFound"
  | "campaign.error.audience.null"
  | "campaign.error.conversionEvent.notFound"
  | "campaign.error.conversionEvent.null"
  | "campaign.error.notification.notFound"
  | "campaign.error.notification.null"
  | "campain.error.status.null"
  | "campain.error.scheduling.null"
  | "campaign.error.update.status.invalid"
  | "campaign.error.delete.status.invalid"

  /**
   * Channel errors
   */
  | "channel.error.name.larger"

  /**
   * Converion event errors
   */
  | "conversionEvent.error.name.larger"
  | "conversionEvent.error.name.exists"
  | "conversionEvent.error.name.null"
  | "conversionEvent.error.title.larger"

  /**
   * Notification errors
   */
  | "notification.error.title.larger"
  | "notification.error.title.exists"
  | "notification.error.title.null"

  /**
   * User errors
   */
  | "user.error.password.invalid"
  | "user.error.name.exists"

  /**
   * [SRIPTS] Department errors
   */
  | "department.error.name.exists"

  /**
   * [SRIPTS] Script errors
   */
  | "script.error.name.exists"

  /**
   * [MAPS] Maps errors
   */
  | "position.error.name.exists"
  | "positionGroup.error.name.exists"
  | ""

  /**
   * Default
   */
  | "default.error.notFound";
