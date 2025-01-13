import logging
import os

class Logger:
    def __init__(self, name: str, log_file: str = None, level: int = logging.DEBUG):
        """Initialize the logger.

        Args:
            name (str): Name of the logger.
            log_file (str, optional): File to log messages. Defaults to None.
            level (int, optional): Logging level. Defaults to logging.DEBUG.
        """
        self.logger = logging.getLogger(name)
        self.logger.setLevel(level)

        ch = logging.StreamHandler()
        ch.setLevel(level)

        formatter = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')
        ch.setFormatter(formatter)

        # Add the console handler to the logger
        self.logger.addHandler(ch)

        # If a log file is provided, add a file handler
        if log_file:
            fh = logging.FileHandler(log_file)
            fh.setLevel(level)
            fh.setFormatter(formatter)
            self.logger.addHandler(fh)

    def debug(self, msg: str):
        """Log a debug message."""
        self.logger.debug(msg)

    def info(self, msg: str):
        """Log an info message."""
        self.logger.info(msg)

    def warning(self, msg: str):
        """Log a warning message."""
        self.logger.warning(msg)

    def error(self, msg: str):
        """Log an error message."""
        self.logger.error(msg)

    def critical(self, msg: str):
        """Log a critical message."""
        self.logger.critical(msg)
