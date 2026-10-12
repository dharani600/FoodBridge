@REM ----------------------------------------------------------------------------
@REM Licensed to the Apache Software Foundation (ASF)
@REM ----------------------------------------------------------------------------

@IF "%__MVNW_ARG0_NAME__%"=="" (SET __MVNW_ARG0_NAME__=%~nx0)
@SET PN=%__MVNW_ARG0_NAME__%
@SET PEXT=%PN:~-4%
@IF /I "%PEXT%" == ".cmd" @SET PN=%PN:~0,-4%
@IF /I "%PEXT%" == ".bat" @SET PN=%PN:~0,-4%

@SET MAVEN_PROJECTBASEDIR=%~dp0
@IF "%MAVEN_PROJECTBASEDIR:~-1%" == "\" SET MAVEN_PROJECTBASEDIR=%MAVEN_PROJECTBASEDIR:~0,-1%

@SET MAVEN_WRAPPER_JAR=%MAVEN_PROJECTBASEDIR%\.mvn\wrapper\maven-wrapper.jar

@IF NOT "%JAVA_HOME%"=="" (
  @SET JAVA_EXECUTABLE="%JAVA_HOME%\bin\java.exe"
) ELSE (
  @SET JAVA_EXECUTABLE=java
)

@SET WRAPPER_LAUNCHER=org.apache.maven.wrapper.MavenWrapperMain

%JAVA_EXECUTABLE% -classpath "%MAVEN_WRAPPER_JAR%" "-Dmaven.multiModuleProjectDirectory=%MAVEN_PROJECTBASEDIR%" %WRAPPER_LAUNCHER% %*
