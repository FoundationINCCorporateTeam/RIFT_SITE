#!/bin/bash
################################################################################
# RIFT Programming Language - Universal Installer
# Version: 1.0.0
# Website: https://rift.astroyds.com
# 
# Installation Methods:
#   curl -sSL https://rift.astroyds.com/rift/install.sh | bash
#   wget -qO- https://rift.astroyds.com/rift/install.sh | bash
#
# This installer will:
#   - Install the RIFT programming language
#   - Set up the 'rift' and 'riftserver' CLI commands
#   - Install Python dependencies (optional)
#   - Configure environment variables
#   - Provide comprehensive error handling and logging
################################################################################

set -e  # Exit on error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
MAGENTA='\033[0;35m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color
BOLD='\033[1m'

# Installation configuration
RIFT_VERSION="0.1.0"
INSTALL_DIR="${RIFT_INSTALL_DIR:-$HOME/.rift}"
BIN_DIR="${RIFT_BIN_DIR:-$HOME/.local/bin}"
RIFT_REPO_URL="https://rift.astroyds.com/rift/source"
RIFT_TAR_URL="https://github.com/FoundationINCCorporateTeam/RIFT/archive/refs/heads/main.tar.gz"
LOG_FILE="/tmp/rift_install_$(date +%Y%m%d_%H%M%S).log"
INSTALL_DEPS=true
VERBOSE=false
FORCE_INSTALL=false

# System detection
OS_TYPE=$(uname -s)
ARCH_TYPE=$(uname -m)

################################################################################
# Helper Functions
################################################################################

print_header() {
    echo -e "${CYAN}${BOLD}"
    echo "╔═══════════════════════════════════════════════════════════════╗"
    echo "║                                                               ║"
    echo "║   RIFT Programming Language - Installation Wizard             ║"
    echo "║   Rapid Integrated Framework Technology                       ║"
    echo "║                                                               ║"
    echo "║   Version: $RIFT_VERSION                                      ║"
    echo "║   Website: https://rift.astroyds.com                          ║"
    echo "║                                                               ║"
    echo "╚═══════════════════════════════════════════════════════════════╝"
    echo -e "${NC}"
}

log() {
    local level=$1
    shift
    local message="$@"
    local timestamp=$(date '+%Y-%m-%d %H:%M:%S')
    echo "[$timestamp] [$level] $message" >> "$LOG_FILE"
    
    case $level in
        INFO)
            echo -e "${BLUE}[INFO]${NC} $message"
            ;;
        SUCCESS)
            echo -e "${GREEN}[✓]${NC} $message"
            ;;
        WARNING)
            echo -e "${YELLOW}[⚠]${NC} $message"
            ;;
        ERROR)
            echo -e "${RED}[✗]${NC} $message"
            ;;
        STEP)
            echo -e "${MAGENTA}[→]${NC} ${BOLD}$message${NC}"
            ;;
    esac
    
    if [ "$VERBOSE" = true ]; then
        echo -e "${CYAN}    Details: $message${NC}" >&2
    fi
}

print_progress() {
    local current=$1
    local total=$2
    local task=$3
    local percent=$((current * 100 / total))
    local filled=$((percent / 2))
    local empty=$((50 - filled))
    
    printf "\r${CYAN}["
    printf "%${filled}s" | tr ' ' '█'
    printf "%${empty}s" | tr ' ' '░'
    printf "] %3d%% - %s${NC}" "$percent" "$task"
    
    if [ $current -eq $total ]; then
        echo ""
    fi
}

check_command() {
    command -v "$1" >/dev/null 2>&1
}

check_python() {
    log STEP "Checking Python installation..."
    
    if check_command python3; then
        PYTHON_CMD="python3"
        PYTHON_VERSION=$(python3 --version 2>&1 | awk '{print $2}')
        log SUCCESS "Found Python $PYTHON_VERSION"
        return 0
    elif check_command python; then
        PYTHON_CMD="python"
        PYTHON_VERSION=$(python --version 2>&1 | awk '{print $2}')
        
        # Check if it's Python 3
        if echo "$PYTHON_VERSION" | grep -q "^3\."; then
            log SUCCESS "Found Python $PYTHON_VERSION"
            return 0
        else
            log ERROR "Python 3 is required, but found Python $PYTHON_VERSION"
            return 1
        fi
    else
        log ERROR "Python 3 is not installed"
        return 1
    fi
}

install_python_hint() {
    echo -e "\n${YELLOW}Python 3 is required to run RIFT.${NC}"
    echo -e "Please install Python 3.8 or later:\n"
    
    case $OS_TYPE in
        Linux)
            if check_command apt-get; then
                echo -e "  ${CYAN}sudo apt-get update && sudo apt-get install python3 python3-pip${NC}"
            elif check_command yum; then
                echo -e "  ${CYAN}sudo yum install python3 python3-pip${NC}"
            elif check_command dnf; then
                echo -e "  ${CYAN}sudo dnf install python3 python3-pip${NC}"
            elif check_command pacman; then
                echo -e "  ${CYAN}sudo pacman -S python python-pip${NC}"
            fi
            ;;
        Darwin)
            echo -e "  ${CYAN}brew install python3${NC}"
            echo -e "  or download from: https://www.python.org/downloads/"
            ;;
        *)
            echo -e "  Visit: https://www.python.org/downloads/"
            ;;
    esac
    echo ""
}

check_dependencies() {
    log STEP "Checking system dependencies..."
    
    local missing_deps=()
    
    # Check for essential tools
    if ! check_command curl && ! check_command wget; then
        missing_deps+=("curl or wget")
    fi
    
    if ! check_command tar; then
        missing_deps+=("tar")
    fi
    
    if ! check_command git; then
        log WARNING "git is not installed (optional, but recommended)"
    fi
    
    if [ ${#missing_deps[@]} -gt 0 ]; then
        log ERROR "Missing dependencies: ${missing_deps[*]}"
        return 1
    fi
    
    log SUCCESS "All required dependencies found"
    return 0
}

create_directories() {
    log STEP "Creating installation directories..."
    
    mkdir -p "$INSTALL_DIR" 2>/dev/null || {
        log ERROR "Failed to create directory: $INSTALL_DIR"
        return 1
    }
    
    mkdir -p "$BIN_DIR" 2>/dev/null || {
        log ERROR "Failed to create directory: $BIN_DIR"
        return 1
    }
    
    log SUCCESS "Directories created successfully"
    return 0
}

download_rift() {
    log STEP "Downloading RIFT source code..."
    
    local temp_dir=$(mktemp -d)
    cd "$temp_dir"
    
    # Try multiple download methods
    if check_command curl; then
        log INFO "Using curl to download..."
        if curl -fsSL "$RIFT_TAR_URL" -o rift.tar.gz; then
            log SUCCESS "Downloaded successfully"
        else
            log ERROR "Failed to download using curl"
            return 1
        fi
    elif check_command wget; then
        log INFO "Using wget to download..."
        if wget -q "$RIFT_TAR_URL" -O rift.tar.gz; then
            log SUCCESS "Downloaded successfully"
        else
            log ERROR "Failed to download using wget"
            return 1
        fi
    else
        log ERROR "No download tool available"
        return 1
    fi
    
    # Extract archive
    log STEP "Extracting archive..."
    tar -xzf rift.tar.gz || {
        log ERROR "Failed to extract archive"
        return 1
    }
    
    # Find the extracted directory (GitHub adds -main suffix)
    local extracted_dir=$(find . -maxdepth 1 -type d -name "RIFT-*" | head -n 1)
    if [ -z "$extracted_dir" ]; then
        log ERROR "Could not find extracted directory"
        return 1
    fi
    
    # Copy files to installation directory (exclude tests)
    log STEP "Installing RIFT to $INSTALL_DIR..."
    
    # Remove old installation if exists and force flag is set
    if [ "$FORCE_INSTALL" = true ] && [ -d "$INSTALL_DIR/src" ]; then
        log INFO "Removing previous installation..."
        rm -rf "$INSTALL_DIR"/{src,*.py,*.md,*.txt}
    fi
    
    # Copy main files
    cp "$extracted_dir"/*.py "$INSTALL_DIR/" 2>/dev/null || true
    cp "$extracted_dir"/*.md "$INSTALL_DIR/" 2>/dev/null || true
    cp "$extracted_dir"/*.txt "$INSTALL_DIR/" 2>/dev/null || true
    
    # Copy source directory
    if [ -d "$extracted_dir/src" ]; then
        cp -r "$extracted_dir/src" "$INSTALL_DIR/"
    else
        log ERROR "Source directory not found"
        return 1
    fi
    
    # Clean up
    cd /tmp
    rm -rf "$temp_dir"
    
    log SUCCESS "RIFT installed to $INSTALL_DIR"
    return 0
}

create_cli_wrapper() {
    log STEP "Creating CLI wrapper scripts..."
    
    # Create 'rift' command
    cat > "$BIN_DIR/rift" << 'EOFRIFT'
#!/bin/bash
# RIFT Programming Language CLI
# Auto-generated by installer

RIFT_HOME="${RIFT_HOME:-$HOME/.rift}"
PYTHON_CMD="${PYTHON_CMD:-python3}"

# Check if RIFT is installed
if [ ! -f "$RIFT_HOME/rift.py" ]; then
    echo "Error: RIFT is not installed in $RIFT_HOME"
    echo "Please run: curl -sSL https://rift.astroyds.com/rift/install.sh | bash"
    exit 1
fi

# Check for subcommands
case "$1" in
    version|--version|-v)
        exec "$PYTHON_CMD" "$RIFT_HOME/rift.py" --version
        ;;
    help|--help|-h)
        exec "$PYTHON_CMD" "$RIFT_HOME/rift.py" --help
        ;;
    repl)
        exec "$PYTHON_CMD" "$RIFT_HOME/rift.py" repl
        ;;
    update)
        echo "Updating RIFT..."
        curl -sSL https://rift.astroyds.com/rift/install.sh | bash -s -- --force
        ;;
    uninstall)
        echo "Uninstalling RIFT..."
        curl -sSL https://rift.astroyds.com/rift/uninstall.sh | bash
        ;;
    doctor)
        echo "RIFT Environment Check"
        echo "======================"
        echo "RIFT_HOME: $RIFT_HOME"
        echo "Python: $($PYTHON_CMD --version 2>&1)"
        echo "Installation: $([ -d "$RIFT_HOME/src" ] && echo "OK" || echo "MISSING")"
        echo "PATH: $(echo $PATH | tr ':' '\n' | grep -E "rift|\.local/bin" || echo "Not in PATH")"
        ;;
    *)
        # Run script or REPL
        exec "$PYTHON_CMD" "$RIFT_HOME/rift.py" "$@"
        ;;
esac
EOFRIFT
    
    chmod +x "$BIN_DIR/rift"
    log SUCCESS "Created 'rift' command"
    
    # Create 'riftserver' command
    cat > "$BIN_DIR/riftserver" << 'EOFSERVER'
#!/bin/bash
# RIFT Server Runtime CLI
# Auto-generated by installer

RIFT_HOME="${RIFT_HOME:-$HOME/.rift}"
PYTHON_CMD="${PYTHON_CMD:-python3}"

# Check if RIFT is installed
if [ ! -f "$RIFT_HOME/riftserver.py" ]; then
    echo "Error: RIFT is not installed in $RIFT_HOME"
    echo "Please run: curl -sSL https://rift.astroyds.com/rift/install.sh | bash"
    exit 1
fi

# Run riftserver
exec "$PYTHON_CMD" "$RIFT_HOME/riftserver.py" "$@"
EOFSERVER
    
    chmod +x "$BIN_DIR/riftserver"
    log SUCCESS "Created 'riftserver' command"
    
    return 0
}

install_python_dependencies() {
    if [ "$INSTALL_DEPS" = false ]; then
        log INFO "Skipping Python dependencies (use --deps to install)"
        return 0
    fi
    
    log STEP "Installing Python dependencies..."
    
    if [ ! -f "$INSTALL_DIR/requirements.txt" ]; then
        log WARNING "requirements.txt not found, skipping dependency installation"
        return 0
    fi
    
    # Check if pip is available
    if ! check_command pip3 && ! check_command pip; then
        log WARNING "pip is not installed. Dependencies will not be installed."
        log INFO "Install pip with: $PYTHON_CMD -m ensurepip --upgrade"
        return 0
    fi
    
    local PIP_CMD=$(check_command pip3 && echo "pip3" || echo "pip")
    
    log INFO "Installing dependencies with $PIP_CMD..."
    
    if $PIP_CMD install -r "$INSTALL_DIR/requirements.txt" --user -q 2>&1 | tee -a "$LOG_FILE"; then
        log SUCCESS "Python dependencies installed"
    else
        log WARNING "Some dependencies failed to install (this is optional)"
        log INFO "You can install them manually later with:"
        log INFO "  $PIP_CMD install -r $INSTALL_DIR/requirements.txt"
    fi
    
    return 0
}

configure_environment() {
    log STEP "Configuring environment..."
    
    # Detect shell configuration file
    local shell_config=""
    local shell_name=$(basename "$SHELL")
    
    case $shell_name in
        bash)
            if [ -f "$HOME/.bashrc" ]; then
                shell_config="$HOME/.bashrc"
            elif [ -f "$HOME/.bash_profile" ]; then
                shell_config="$HOME/.bash_profile"
            fi
            ;;
        zsh)
            shell_config="$HOME/.zshrc"
            ;;
        fish)
            shell_config="$HOME/.config/fish/config.fish"
            ;;
        *)
            log WARNING "Unknown shell: $shell_name"
            ;;
    esac
    
    if [ -n "$shell_config" ] && [ -f "$shell_config" ]; then
        # Check if PATH already contains BIN_DIR
        if ! grep -q "$BIN_DIR" "$shell_config" 2>/dev/null; then
            log INFO "Adding $BIN_DIR to PATH in $shell_config"
            
            echo "" >> "$shell_config"
            echo "# RIFT Programming Language" >> "$shell_config"
            echo "export RIFT_HOME=\"$INSTALL_DIR\"" >> "$shell_config"
            echo "export PATH=\"$BIN_DIR:\$PATH\"" >> "$shell_config"
            
            log SUCCESS "Environment configured"
        else
            log INFO "PATH already configured"
        fi
    fi
    
    # Export for current session
    export RIFT_HOME="$INSTALL_DIR"
    export PATH="$BIN_DIR:$PATH"
    
    return 0
}

verify_installation() {
    log STEP "Verifying installation..."
    
    local errors=0
    
    # Check if rift command exists
    if [ -x "$BIN_DIR/rift" ]; then
        log SUCCESS "rift command installed"
    else
        log ERROR "rift command not found"
        errors=$((errors + 1))
    fi
    
    # Check if riftserver command exists
    if [ -x "$BIN_DIR/riftserver" ]; then
        log SUCCESS "riftserver command installed"
    else
        log ERROR "riftserver command not found"
        errors=$((errors + 1))
    fi
    
    # Check if source files exist
    if [ -d "$INSTALL_DIR/src" ]; then
        log SUCCESS "Source files installed"
    else
        log ERROR "Source files not found"
        errors=$((errors + 1))
    fi
    
    # Check if main scripts exist
    if [ -f "$INSTALL_DIR/rift.py" ] && [ -f "$INSTALL_DIR/riftserver.py" ]; then
        log SUCCESS "Main scripts installed"
    else
        log ERROR "Main scripts not found"
        errors=$((errors + 1))
    fi
    
    return $errors
}

print_completion_message() {
    echo ""
    echo -e "${GREEN}${BOLD}╔═══════════════════════════════════════════════════════════════╗${NC}"
    echo -e "${GREEN}${BOLD}║                                                               ║${NC}"
    echo -e "${GREEN}${BOLD}║   ✓ RIFT has been successfully installed!                     ║${NC}"
    echo -e "${GREEN}${BOLD}║                                                               ║${NC}"
    echo -e "${GREEN}${BOLD}╚═══════════════════════════════════════════════════════════════╝${NC}"
    echo ""
    echo -e "${CYAN}Installation Details:${NC}"
    echo -e "  Location:    ${BOLD}$INSTALL_DIR${NC}"
    echo -e "  Commands:    ${BOLD}$BIN_DIR${NC}"
    echo -e "  Version:     ${BOLD}$RIFT_VERSION${NC}"
    echo -e "  Log file:    ${BOLD}$LOG_FILE${NC}"
    echo ""
    echo -e "${CYAN}Quick Start:${NC}"
    echo -e "  ${BOLD}rift${NC}                    - Start interactive REPL"
    echo -e "  ${BOLD}rift script.rift${NC}        - Run a RIFT script"
    echo -e "  ${BOLD}riftserver app.rift${NC}     - Start a RIFT server"
    echo -e "  ${BOLD}rift --help${NC}             - Show help message"
    echo -e "  ${BOLD}rift doctor${NC}             - Check installation"
    echo ""
    echo -e "${CYAN}Commands:${NC}"
    echo -e "  ${BOLD}rift update${NC}             - Update RIFT to latest version"
    echo -e "  ${BOLD}rift uninstall${NC}          - Uninstall RIFT"
    echo -e "  ${BOLD}rift version${NC}            - Show version information"
    echo ""
    echo -e "${YELLOW}Note:${NC} You may need to restart your shell or run:"
    echo -e "  ${BOLD}source ~/.bashrc${NC}  (or ~/.zshrc for zsh)"
    echo -e "or simply start a new terminal session."
    echo ""
    echo -e "${CYAN}Documentation:${NC} https://rift.astroyds.com/docs"
    echo -e "${CYAN}Examples:${NC}      https://github.com/FoundationINCCorporateTeam/RIFT/tree/main/tests/examples"
    echo ""
}

print_usage() {
    echo "RIFT Installer - Usage"
    echo ""
    echo "Usage: ./install.sh [OPTIONS]"
    echo ""
    echo "Options:"
    echo "  --help              Show this help message"
    echo "  --version           Show installer version"
    echo "  --verbose, -v       Enable verbose output"
    echo "  --force, -f         Force reinstall (overwrite existing)"
    echo "  --no-deps           Skip Python dependency installation"
    echo "  --install-dir DIR   Set custom installation directory"
    echo "  --bin-dir DIR       Set custom bin directory"
    echo ""
    echo "Environment Variables:"
    echo "  RIFT_INSTALL_DIR    Installation directory (default: ~/.rift)"
    echo "  RIFT_BIN_DIR        Bin directory (default: ~/.local/bin)"
    echo ""
    echo "Examples:"
    echo "  curl -sSL https://rift.astroyds.com/rift/install.sh | bash"
    echo "  ./install.sh --verbose --force"
    echo "  RIFT_INSTALL_DIR=/opt/rift ./install.sh"
    echo ""
}

cleanup_on_error() {
    log ERROR "Installation failed!"
    echo ""
    echo -e "${RED}Installation was unsuccessful.${NC}"
    echo -e "Log file saved to: ${BOLD}$LOG_FILE${NC}"
    echo ""
    echo -e "Common issues:"
    echo -e "  1. Python 3 not installed - run ${CYAN}python3 --version${NC} to check"
    echo -e "  2. Insufficient permissions - try installing to user directory"
    echo -e "  3. Network issues - check your internet connection"
    echo ""
    echo -e "For help, visit: ${CYAN}https://rift.astroyds.com/docs/installation${NC}"
    exit 1
}

################################################################################
# Main Installation Process
################################################################################

main() {
    # Parse command-line arguments
    while [[ $# -gt 0 ]]; do
        case $1 in
            --help|-h)
                print_usage
                exit 0
                ;;
            --version)
                echo "RIFT Installer v$RIFT_VERSION"
                exit 0
                ;;
            --verbose|-v)
                VERBOSE=true
                shift
                ;;
            --force|-f)
                FORCE_INSTALL=true
                shift
                ;;
            --no-deps)
                INSTALL_DEPS=false
                shift
                ;;
            --install-dir)
                INSTALL_DIR="$2"
                shift 2
                ;;
            --bin-dir)
                BIN_DIR="$2"
                shift 2
                ;;
            *)
                log ERROR "Unknown option: $1"
                print_usage
                exit 1
                ;;
        esac
    done
    
    # Start installation
    print_header
    
    log INFO "Starting RIFT installation..."
    log INFO "OS: $OS_TYPE"
    log INFO "Architecture: $ARCH_TYPE"
    log INFO "Install Directory: $INSTALL_DIR"
    log INFO "Bin Directory: $BIN_DIR"
    echo ""
    
    # Installation steps
    local total_steps=8
    local current_step=0
    
    # Step 1: Check Python
    current_step=$((current_step + 1))
    print_progress $current_step $total_steps "Checking Python..."
    if ! check_python; then
        install_python_hint
        cleanup_on_error
    fi
    
    # Step 2: Check Dependencies
    current_step=$((current_step + 1))
    print_progress $current_step $total_steps "Checking dependencies..."
    check_dependencies || cleanup_on_error
    
    # Step 3: Create Directories
    current_step=$((current_step + 1))
    print_progress $current_step $total_steps "Creating directories..."
    create_directories || cleanup_on_error
    
    # Step 4: Download RIFT
    current_step=$((current_step + 1))
    print_progress $current_step $total_steps "Downloading RIFT..."
    download_rift || cleanup_on_error
    
    # Step 5: Create CLI Wrapper
    current_step=$((current_step + 1))
    print_progress $current_step $total_steps "Creating CLI commands..."
    create_cli_wrapper || cleanup_on_error
    
    # Step 6: Install Dependencies
    current_step=$((current_step + 1))
    print_progress $current_step $total_steps "Installing Python dependencies..."
    install_python_dependencies
    
    # Step 7: Configure Environment
    current_step=$((current_step + 1))
    print_progress $current_step $total_steps "Configuring environment..."
    configure_environment || cleanup_on_error
    
    # Step 8: Verify Installation
    current_step=$((current_step + 1))
    print_progress $current_step $total_steps "Verifying installation..."
    if ! verify_installation; then
        cleanup_on_error
    fi
    
    # Success!
    print_completion_message
}

# Handle interrupts gracefully
trap 'echo ""; log ERROR "Installation interrupted"; exit 1' INT TERM

# Run main installation
main "$@"
